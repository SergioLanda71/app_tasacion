const request = require('supertest');
const app = require('../src/app');
const sequelize = require('../src/database/database');
const Client = require('../src/models/client');
const jwt = require('jsonwebtoken');

let token;

beforeAll(async () => {
  await sequelize.sync({ force: true });
  token = jwt.sign({ userId: 1 }, process.env.JWT_SECRET, { expiresIn: '1h' });
});

describe('Client Endpoints', () => {
  it('should create a new client', async () => {
    const res = await request(app)
      .post('/api/clients')
      .set('Authorization', `Bearer ${token}`)
      .send({
        nombre_razon_social: 'Test Client',
        telefono: '123456789',
        email: 'client@test.com',
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('message', 'Client created successfully');
  });

  it('should not create a new client without a token', async () => {
    const res = await request(app)
      .post('/api/clients')
      .send({
        nombre_razon_social: 'Test Client',
        telefono: '123456789',
        email: 'client@test.com',
      });
    expect(res.statusCode).toEqual(401);
  });

  it('should get all clients', async () => {
    await Client.create({
      nombre_razon_social: 'Test Client 2',
      telefono: '987654321',
      email: 'client2@test.com',
    });

    const res = await request(app)
      .get('/api/clients')
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it('should get a client by id', async () => {
    const client = await Client.create({
      nombre_razon_social: 'Test Client 3',
      telefono: '123456789',
      email: 'client3@test.com',
    });

    const res = await request(app)
      .get(`/api/clients/${client.id}`)
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body.nombre_razon_social).toEqual('Test Client 3');
  });

  it('should update a client', async () => {
    const client = await Client.create({
      nombre_razon_social: 'Test Client 4',
      telefono: '123456789',
      email: 'client4@test.com',
    });

    const res = await request(app)
      .put(`/api/clients/${client.id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        nombre_razon_social: 'Updated Client',
        telefono: '987654321',
        email: 'updated@test.com',
      });
    expect(res.statusCode).toEqual(200);
  });

  it('should delete a client', async () => {
    const client = await Client.create({
      nombre_razon_social: 'Test Client 5',
      telefono: '123456789',
      email: 'client5@test.com',
    });

    const res = await request(app)
      .delete(`/api/clients/${client.id}`)
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toEqual(200);
  });
});

afterAll(async () => {
  await sequelize.close();
});
