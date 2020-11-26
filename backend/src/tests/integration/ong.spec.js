const request = require('supertest');
const app = require('../../app');
const connection = require('../../../src/database/connection');
const { isExportDeclaration } = require('typescript');


describe('ONG', () => {
  beforeEach(async () => {
    await connection.migrate.rollback();
    await connection.migrate.latest();
  });

  afterAll(async () => {
    await connection.destroy
  });

  it('should be able to create a new ONG', async () => {
    const response = await request(app)
      .post('/ongs')
      .send({
        name: "oaspsp",
        email: "kaskaka@email.com",
        whatsapp: "1699694350",
        city: "Sei la",
        uf: "RR"
      });
    expect(response.body).toHaveProperty('id')
    expect(response.body.id).toHaveLength(8)
  });

})