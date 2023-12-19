const request = require('supertest');
const app = require('../index');

describe('Testando Rotas', () => {
  it('Deve retornar status 200 na rota principal', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
    expect(response.text).toContain('Full Cycle Rocks!');
  });

  it('Deve retornar status 200 ao buscar todas as pessoas', async () => {
    const response = await request(app).get('/api/v1/people/');
    expect(response.status).toBe(200);
    expect(response.body.length).toBeGreaterThanOrEqual(0);
    if (response.body.length > 0) {
      expect(response.body[0].name).toBeDefined();
      expect(response.body[0].id).toBeDefined();
    }
  });

  it('Deve retornar status 201 ao criar uma pessoa', async () => {
    const response = await request(app)
      .post('/api/v1/create-people/')
      .send({ name: 'Novo Nome' });
    expect(response.status).toBe(201);
    expect(response.body.message).toBe('Nome "Novo Nome" inserido com sucesso');
  });

  it('Deve retornar status 400 se o nome não for fornecido ao criar uma pessoa', async () => {
    const response = await request(app)
      .post('/api/v1/create-people/')
      .send({}); // Aqui, não está fornecendo o nome
    expect(response.status).toBe(400);
    expect(response.body.error).toBe('Nome não fornecido');
  });
});
