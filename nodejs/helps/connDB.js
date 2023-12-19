const mysql = require('mysql');

class Database {
  constructor(config) {
    this.connection = mysql.createConnection(config);
  }

  connect() {
    this.connection.connect((error) => {
      if (error) {
        console.error('Erro ao conectar ao banco de dados:', error);
        return;
      }
      console.log('Conexão ao banco de dados MySQL estabelecida');
      this.createPeopleTable(); // Chama o método para criar a tabela
    });
  }

  createPeopleTable() {
    const sql = `
      CREATE TABLE IF NOT EXISTS people (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL
      )
    `;
    this.connection.query(sql, (err) => {
      if (err) {
        console.error('Erro ao criar a tabela people:', err);
        return;
      }
      console.log('Tabela "people" criada com sucesso ou já existente');
    });
  }

  query(sql, args, callback) {
    return this.connection.query(sql, args, callback);
  }

  close() {
    this.connection.end((error) => {
      if (error) {
        console.error('Erro ao fechar a conexão com o banco de dados:', error);
        return;
      }
      console.log('Conexão com o banco de dados fechada');
    });
  }
}

module.exports = Database;
