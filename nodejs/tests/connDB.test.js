const Database = require('../helpers/connDB');

describe('Database Connection', () => {
  let db;

  beforeAll(() => {
    const dbConfig = {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    };

    db = new Database(dbConfig);
  });

  afterAll(async () => {
    if (db) {
      await db.close();
    }
  });

  it('Deve ligar-se à base de dados', async () => {
    await expect(db.connect()).resolves.not.toThrow();
  });

  it('deve executar uma consulta', async () => {
    const result = await db.query('SELECT * FROM people');
    expect(result).toBeTruthy();
    expect(result.length).toBeGreaterThan(0);
  });
});
