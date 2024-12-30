const request = require('supertest');
const express = require('express');
const sequelize = require('../database');
const User = require('../models/User');
const userRoutes = require('../routes/router');

const app = express();
app.use(express.json());
app.use('/api', userRoutes);

beforeAll(async () => {
  await sequelize.sync({ force: true });
});

afterAll(async () => {
  await sequelize.close();
});

describe('User Routes', () => {
  it('should create a new user', async () => {
    const response = await request(app)
      .post('/api/users')
      .send({
        name: 'testuser',
        email: 'testuser@example.com',
        password: 'password123',
        city: 'Test City',
        tel: '1234567890',
        birthday: '2000-01-01',
      });
    expect(response.status).toBe(201);
    expect(response.body.name).toBe('testuser');
  });

  it('should get all users', async () => {
    const response = await request(app).get('/api/users');
    expect(response.status).toBe(200);
    expect(response.body.length).toBeGreaterThan(0);
  });

  it('should get a user by ID', async () => {
    const user = await User.create({
      name: 'testuser2',
      email: 'testuser2@example.com',
      password: 'password123',
      city: 'Test City',
      tel: '1234567890',
      birthday: '2000-01-01',
    });
    const response = await request(app).get(`/api/users/${user.id}`);
    expect(response.status).toBe(200);
    expect(response.body.name).toBe('testuser2');
  });

  it('should update a user', async () => {
    const user = await User.create({
      name: 'testuser3',
      email: 'testuser3@example.com',
      password: 'password123',
      city: 'Test City',
      tel: '1234567890',
      birthday: '2000-01-01',
    });
    const response = await request(app)
      .put(`/api/users/${user.id}`)
      .send({
        name: 'updateduser',
        email: 'updateduser@example.com',
        password: 'newpassword123',
        city: 'Updated City',
        tel: '0987654321',
        birthday: '1999-01-01',
      });
    expect(response.status).toBe(200);
    expect(response.body.name).toBe('updateduser');
  });

  it('should delete a user', async () => {
    const user = await User.create({
      name: 'testuser4',
      email: 'testuser4@example.com',
      password: 'password123',
      city: 'Test City',
      tel: '1234567890',
      birthday: '2000-01-01',
    });
    const response = await request(app).delete(`/api/users/${user.id}`);
    expect(response.status).toBe(204);
  });
});