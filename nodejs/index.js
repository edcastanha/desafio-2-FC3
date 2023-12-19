const express = require('express');
const Database = require('./helpers/connDB'); // Importa a classe de conexão com o banco de dados

const app = express();
app.use(express.json());

const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
};

const db = new Database(dbConfig);

// Conectar ao banco de dados
db.connect().catch((err) => {
  console.error('Erro ao conectar ao banco de dados:', err);
  process.exit(1);
});

// Rota padrão
app.get('/', (req, res) => {
  res.send('<h1>Full Cycle Rocks!</h1>');
});

// Rota para buscar todas as pessoas
app.get('/api/v1/people', async (req, res) => {
  try {
    const rows = await db.query('SELECT * FROM people');
    res.status(200).json(rows); // Retorna os resultados da consulta como JSON
  } catch (error) {
    console.error('Erro ao executar a consulta:', error);
    res.status(500).json({ error: 'Erro ao buscar pessoas' });
  }
});

// Rota para criar uma pessoa
app.post('/api/v1/create-people', async (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ error: 'Nome não fornecido' });
  }

  try {
    console.log('Recebido o nome:', name);
    await db.query('INSERT INTO people (name) VALUES (?)', [name]);
    res.status(201).json({ message: `Nome "${name}" inserido com sucesso` });
  } catch (error) {
    console.error('Erro ao inserir o nome:', error);
    res.status(500).json({ error: 'Erro ao inserir o nome na tabela' });
  }
});

// Encerramento da conexão com o banco de dados quando o aplicativo é encerrado
process.on('SIGINT', async () => {
  try {
    await db.close(); // Fechando a conexão de forma assíncrona
    console.log('Conexão com o banco de dados encerrada com sucesso');
    process.exit(0); // Sair do processo com sucesso
  } catch (error) {
    console.error('Erro ao encerrar a conexão com o banco de dados:', error);
    process.exit(1); // Sair do processo com erro
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor Node.js rodando na porta ${PORT}`);
});
