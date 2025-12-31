const request = require('supertest');
const app = require('../src/app');
const sequelize = require('../src/database/database');
const Property = require('../src/models/property');
const jwt = require('jsonwebtoken');

let token;

beforeAll(async () => {
  await sequelize.sync({ force: true });
  token = jwt.sign({ userId: 1 }, process.env.JWT_SECRET, { expiresIn: '1h' });
});

describe('Property Endpoints', () => {
  it('should create a new property', async () => {
    const res = await request(app)
      .post('/api/properties')
      .set('Authorization', `Bearer ${token}`)
      .send({
        titulo_propiedad: 'Test Property',
        tipo_operacion: 'Venta',
        tipo_inmueble: 'Departamento',
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('message', 'Property created successfully');
  });

  it('should not create a new property without a token', async () => {
    const res = await request(app)
      .post('/api/properties')
      .send({
        titulo_propiedad: 'Test Property',
        tipo_operacion: 'Venta',
        tipo_inmueble: 'Departamento',
      });
    expect(res.statusCode).toEqual(401);
  });

  it('should get all properties', async () => {
    await Property.create({
      titulo_propiedad: 'Test Property 2',
      tipo_operacion: 'Alquiler',
      tipo_inmueble: 'Casa',
    });

    const res = await request(app)
      .get('/api/properties')
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it('should get a property by id', async () => {
    const property = await Property.create({
      titulo_propiedad: 'Test Property 3',
      tipo_operacion: 'Venta',
      tipo_inmueble: 'PH',
    });

    const res = await request(app)
      .get(`/api/properties/${property.id}`)
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body.titulo_propiedad).toEqual('Test Property 3');
  });

  it('should update a property', async () => {
    const property = await Property.create({
      titulo_propiedad: 'Test Property 4',
      tipo_operacion: 'Venta',
      tipo_inmueble: 'Local',
    });

    const res = await request(app)
      .put(`/api/properties/${property.id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        titulo_propiedad: 'Updated Property',
        tipo_operacion: 'Alquiler',
        tipo_inmueble: 'Oficina',
      });
    expect(res.statusCode).toEqual(200);
  });

  it('should delete a property', async () => {
    const property = await Property.create({
      titulo_propiedad: 'Test Property 5',
      tipo_operacion: 'Venta',
      tipo_inmueble: 'Terreno',
    });

    const res = await request(app)
      .delete(`/api/properties/${property.id}`)
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toEqual(200);
  });
});

afterAll(async () => {
  await sequelize.close();
});
