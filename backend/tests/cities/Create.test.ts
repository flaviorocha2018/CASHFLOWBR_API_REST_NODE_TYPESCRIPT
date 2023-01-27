import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';
import { before } from 'node:test';



describe('City - Create', () => {

  let accessToken = '';
  beforeAll(async () => {
    const email = 'create-city@gmail.com';
    const password = 'Cash123456';
    await testServer.post('/signup').send({userName: 'Teste', email, password});
    const signInres = await testServer.post('/signin').send({email, password});

    accessToken = signInres.body.accessToken;
  });

  it('Try to Insert a new register without access token', async () => {
    const result1 = await testServer.post('/city')
      .send({name: 'Petrópolis', state: 'RJ'});
    expect(result1.statusCode).toEqual(StatusCodes.UNAUTHORIZED);
    expect(result1.body).toHaveProperty('errors.default');
  });


  it('Insert a new register', async () => {
    const result1 = await testServer.post('/city')
      .set({Authorization: `Bearer ${accessToken}`})
      .send({name: 'Petrópolis', state: 'RJ'});
    expect(result1.statusCode).toEqual(StatusCodes.CREATED);
    expect(typeof result1.body).toEqual('number');
  });

  it('Try to insert a new register with a short name', async () => {
    const result1 = await testServer.post('/city')
      .set({Authorization: `Bearer ${accessToken}`})
      .send({name: 'Pe', state: 'RJ'});
    expect(result1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(result1.body).toHaveProperty('errors.body.name');
  });
});