const express = require('express')
const mysql = require('mysql')

const app = express()
const port = 3000

// Configurações do banco de dados
const connection = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
})

// Rota /healthcheck
app.get('/healthcheck', (req, res) => {
    connection.query('SELECT 1', (error, results) => {
    if (error) {
      console.error('Erro de conexão com o banco de dados:', error);
      return res.status(500).send('Erro de conexão com o banco de dados');
    }
    
    console.log('Conexão com o banco de dados estabelecida com sucesso');
    res.status(200).send('OK');
  });
});

