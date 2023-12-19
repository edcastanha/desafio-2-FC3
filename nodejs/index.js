const express = require('express');
const Database = require('./helps/connDB'); // Importa a classe de conexão com o banco de dados

const app = express();


// Exemplo de utilização dos dados da variável de ambiente
console.log('Configurações do banco de dados:');
console.log('Host:', dbConfig.host);
console.log('Usuário:', dbConfig.user);
console.log('Senha:', dbConfig.password);
console.log('Nome do Banco de Dados:', dbConfig.database);
// Configurações de conexão com o banco de dados
const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
};

// Instancia a classe de conexão com o banco de dados
const db = new Database(dbConfig);
db.connect(); // Conecta ao banco de dados


app.get('/', (req, res) => {
  connection.query('SELECT 1', (error, results) => {
  if (error) {
    console.error('Erro de conexão com o banco de dados:', error);
    return res.status(500).send('Erro de conexão com o banco de dados');
  }
  
  console.log('Conexão com o banco de dados estabelecida com sucesso');
  res.status(200).send('OK');
});
});

// Rota GET para obter nomes cadastrados
app.get('/api/v1/people', (req, res) => {
  db.query('SELECT * FROM people', (err, rows) => {
    if (err) {
      console.error('Erro ao buscar os nomes:', err);
      res.status(500).send('Erro ao buscar os nomes na tabela.');
      return;
    }
    res.send(rows); // Retorna os resultados como JSON
  });
});

// Rota POST para criar um novo nome na tabela de pessoas
app.post('/api/v1/create-people', express.json(), (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.status(400).send('Nome não fornecido.');
    return;
  }

  db.query('INSERT INTO people (name) VALUES (?)', [name], (err, result) => {
    if (err) {
      console.error('Erro ao inserir o nome:', err);
      res.status(500).send('Erro ao inserir o nome na tabela.');
      return;
    }
    res.send(`Nome "${name}" inserido com sucesso!`);
  });
});

// Encerra a conexão com o banco de dados ao fechar o servidor
process.on('SIGINT', () => {
  db.close();
  process.exit();
});

// Iniciar o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor Node.js rodando na porta ${PORT}`);
});
