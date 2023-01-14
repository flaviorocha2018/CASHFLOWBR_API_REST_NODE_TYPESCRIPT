import { StatusCodes } from 'http-status-codes';

import { testServer } from '../jest.setup';


describe('User - SignUp', () => {
  it('Cadastra usuário 1', async () => {
    const res1 = await testServer
      .post('/signup')
      .send({
        password: '123456',
        userName: 'Juca da Silva',
        email: 'jucasilva@gmail.com',
      });
    expect(res1.statusCode).toEqual(StatusCodes.CREATED);
    expect(typeof res1.body).toEqual('number');
  });
  it('Cadastra usuário 2', async () => {
    const res1 = await testServer
      .post('/signup')
      .send({
        password: '123456',
        userName: 'Pedro da Rosa',
        email: 'pedro@gmail.com',
      });
    expect(res1.statusCode).toEqual(StatusCodes.CREATED);
    expect(typeof res1.body).toEqual('number');
  });
  it('Erro ao signup um usuário com email duplicado', async () => {
    const res1 = await testServer
      .post('/signup')
      .send({
        password: '123456',
        userName: 'Pedro da Rosa',
        email: 'pedroduplicado@gmail.com',
      });
    expect(res1.statusCode).toEqual(StatusCodes.CREATED);
    expect(typeof res1.body).toEqual('number');

    const res2 = await testServer
      .post('/signup')
      .send({
        password: '123456',
        userName: 'Juca da Silva',
        email: 'pedroduplicado@gmail.com',
      });
    expect(res2.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(res2.body).toHaveProperty('errors.default');
  });
  it('Erro ao signup um usuário sem email', async () => {
    const res1 = await testServer
      .post('/signup')
      .send({
        password: '123456',
        userName: 'Juca da Silva',
        // email: 'jucasilva@gmail.com',
      });
    expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res1.body).toHaveProperty('errors.body.email');
  });
  it('Erro ao signup um usuário sem userName', async () => {
    const res1 = await testServer
      .post('/signup')
      .send({
        password: '123456',
        // userName: 'Juca da Silva',
        email: 'jucasilva@gmail.com',
      });
    expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res1.body).toHaveProperty('errors.body.userName');
  });
  it('Erro ao signup um usuário sem password', async () => {
    const res1 = await testServer
      .post('/signup')
      .send({
        // password: '123456',
        userName: 'Juca da Silva',
        email: 'jucasilva@gmail.com',
      });
    expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res1.body).toHaveProperty('errors.body.password');
  });
  it('Erro ao signup um usuário com email inválido', async () => {
    const res1 = await testServer
      .post('/signup')
      .send({
        password: '123456',
        userName: 'Juca da Silva',
        email: 'jucasilva gmail.com',
      });
    expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res1.body).toHaveProperty('errors.body.email');
  });
  it('Erro ao signup um usuário com password muito pequena', async () => {
    const res1 = await testServer
      .post('/signup')
      .send({
        password: '123',
        userName: 'Juca da Silva',
        email: 'jucasilva@gmail.com',
      });
    expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res1.body).toHaveProperty('errors.body.password');
  });
  it('Erro ao signup um usuário com userName muito pequeno', async () => {
    const res1 = await testServer
      .post('/signup')
      .send({
        password: '123456',
        userName: 'Ju',
        email: 'jucasilva@gmail.com',
      });
    expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res1.body).toHaveProperty('errors.body.userName');
  });
});