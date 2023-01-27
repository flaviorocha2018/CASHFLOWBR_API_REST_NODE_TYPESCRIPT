import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';


describe('City - GetById', () => {

  let accessToken = '';
  beforeAll(async () => {
    const email = 'create-city@gmail.com';
    const password = 'Cash123456';
    await testServer.post('/signup').send({userName: 'Teste', email, password});
    const signInres = await testServer.post('/signin').send({email, password});

    accessToken = signInres.body.accessToken;
  });


  it('Get a register by Id', async () => {
    const result1 = await testServer.post('/city')
      .set({Authorization: `Bearer ${accessToken}`})
      .send({name: 'Petrópolis', state: 'RJ'});
    expect(result1.statusCode).toEqual(StatusCodes.CREATED);

    const resultFound = await testServer.get(`/city/${result1.body}`)
      .set({Authorization: `Bearer ${accessToken}`})
      .send();

    expect(resultFound.statusCode).toEqual(StatusCodes.OK);
    expect(resultFound.statusCode).toHaveProperty([]);
  });

  it('Try to get a register that does not exist', async () => {
    const result1 = await testServer.get('/city/99999')
      .set({Authorization: `Bearer ${accessToken}`})
      .send();
    expect(result1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(result1.body).toHaveProperty('errors.default');
  });
});