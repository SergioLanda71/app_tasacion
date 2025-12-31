const request = require('supertest');
const app = require('../src/app');
const sequelize = require('../src/database/database');
const User = require('../src/models/user');
const bcrypt = require('bcrypt');

beforeAll(async () => {
  await sequelize.sync({ force: true });
});

describe('Auth Endpoints', () => {
  it('should register a new user', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({
        nombre_completo: 'Test User',
        email_corporativo: 'test@test.com',
        password: 'password',
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('message', 'User created successfully');
  });

  it('should not register a user with an existing email', async () => {
    await User.create({
      nombre_completo: 'Existing User',
      email_corporativo: 'existing@test.com',
      password: await bcrypt.hash('password', 10),
    });

    const res = await request(app)
      .post('/api/auth/register')
      .send({
        nombre_completo: 'Another User',
        email_corporativo: 'existing@test.com',
        password: 'password',
      });
    expect(res.statusCode).toEqual(500);
  });

  it('should login an existing user', async () => {
    const password = 'password';
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({
      nombre_completo: 'Login User',
      email_corporativo: 'login@test.com',
      password: hashedPassword,
    });

    const res = await request(app)
      .post('/api/auth/login')
      .send({
        email_corporativo: 'login@test.com',
        password: password,
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('token');
  });

  it('should not login with an incorrect password', async () => {
    const password = 'password';
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({
      nombre_completo: 'Login User 2',
      email_corporativo: 'login2@test.com',
      password: hashedPassword,
    });

    const res = await request(app)
      .post('/api/auth/login')
      .send({
        email_corporativo: 'login2@test.com',
        password: 'wrongpassword',
      });
    expect(res.statusCode).toEqual(401);
  });

  it('should not login a user that does not exist', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({
        email_corporativo: 'nonexistent@test.com',
        password: 'password',
      });
    expect(res.statusCode).toEqual(404);
  });
});

afterAll(async () => {
  await sequelize.close();
});
