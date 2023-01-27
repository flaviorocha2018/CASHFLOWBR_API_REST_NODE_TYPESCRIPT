import { StatusCodes } from 'http-status-codes';

import { testServer } from '../jest.setup';


describe('City - UpdateById', () => {

  let accessToken = '';
  beforeAll(async () => {
    const email = 'create-city@gmail.com';
    const password = 'Cash123456';
    await testServer.post('/signup').send({userName: 'Teste', email, password});
    const signInres = await testServer.post('/signin').send({email, password});

    accessToken = signInres.body.accessToken;
  });


  it('Update a  register', async () => {

    const result = await testServer
      .post('/city')
      .set({Authorization: `Bearer ${accessToken}`})
      .send({ name: 'Petrópolis', state: 'RJ' });

    expect(result.statusCode).toEqual(StatusCodes.CREATED);

    const resUpdated = await testServer
      .put(`/city/${result.body}`)
      .set({Authorization: `Bearer ${accessToken}`})
      .send({ nome: 'Caxias' });

    expect(resUpdated.statusCode).toEqual(StatusCodes.NO_CONTENT);
  });
  
  it('Try to update a register that do not exist', async () => {

    const result = await testServer
      .put('/city/99999')
      .set({Authorization: `Bearer ${accessToken}`})
      .send({ nome: 'Caxias' });

    expect(result.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(result.body).toHaveProperty('errors.default');
  });
});