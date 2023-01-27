import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';


describe('City - GetAll', () => {

  let accessToken = '';
  beforeAll(async () => {
    const email = 'create-city@gmail.com';
    const password = 'Cash123456';
    await testServer.post('/signup').send({userName: 'Teste', email, password});
    const signInres = await testServer.post('/signin').send({email, password});

    accessToken = signInres.body.accessToken;
  });


  it('Get All  existing registers', async () => {
    const result1 = await testServer.post('/city')
      .set({Authorization: `Bearer ${accessToken}`})
      .send({name: 'Petrópolis', state: 'RJ'});
    expect(result1.statusCode).toEqual(StatusCodes.CREATED);

    const resultCreated = await testServer.get('/city')
      .set({Authorization: `Bearer ${accessToken}`})
      .send();

    expect(Number(resultCreated.header[`x-total-count`])).toBeGreaterThan(0);
    expect(resultCreated.statusCode).toEqual(StatusCodes.OK);
    expect(resultCreated.body.length).toBeGreaterThan(0);
  });

});