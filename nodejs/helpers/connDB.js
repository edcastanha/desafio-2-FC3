const mysql = require('mysql2/promise');

class Database {
  constructor(config) {
    this.config = config;
    this.connection = null;
  }

  async connect() {
    try {
      this.connection = await mysql.createConnection(this.config);
      console.log('Conexão ao banco de dados MySQL estabelecida');
    } catch (error) {
      console.error('Erro ao conectar ao banco de dados:', error);
      throw error; // Rejeitar a promessa para tratar o erro no código que chama a conexão
    }
  }

  async query(sql, args) {
    try {
      const [rows, fields] = await this.connection.execute(sql, args);
      return rows;
    } catch (error) {
      console.error('Erro ao executar a consulta:', error);
      throw error; // Rejeitar a promessa para tratar o erro no código que chama a consulta
    }
  }

  async close() {
    try {
      await this.connection.end();
      console.log('Conexão com o banco de dados fechada');
    } catch (error) {
      console.error('Erro ao fechar a conexão com o banco de dados:', error);
      throw error; // Rejeitar a promessa para tratar o erro no código que chama o fechamento da conexão
    }
  }
}

module.exports = Database;
