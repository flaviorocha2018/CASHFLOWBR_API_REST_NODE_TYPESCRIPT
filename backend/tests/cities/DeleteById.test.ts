import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';


describe('City - Delete', () => {
  let accessToken = '';
  beforeAll(async () => {
    const email = 'create-city@gmail.com';
    const password = 'Cash123456';
    await testServer.post('/signup').send({userName: 'Teste', email, password});
    const signInres = await testServer.post('/signin').send({email, password});

    accessToken = signInres.body.accessToken;
  });


  it('Delete a existing register', async () => {
    const result1 = await testServer.post('/city')
      .set({Authorization: `Bearer ${accessToken}`})
      .send({name: 'Petrópolis', state: 'RJ'});
    expect(result1.statusCode).toEqual(StatusCodes.CREATED);

    const resultDeleted = await testServer.delete(`/city/${result1.body}`).send();
    expect(resultDeleted.statusCode).toEqual(StatusCodes.NO_CONTENT);
  });

  it('Try to delete a register that does not exist', async () => {
    const result1 = await testServer.delete('/city/99999')
      .set({Authorization: `Bearer ${accessToken}`})
      .send();
    expect(result1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(result1.body).toHaveProperty('errors.default');
  });
});