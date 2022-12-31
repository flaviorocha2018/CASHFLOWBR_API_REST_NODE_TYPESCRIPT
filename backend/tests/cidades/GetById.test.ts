import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';


describe('City - GetById', () => {

  it('Get a register by Id', async () => {
    const result1 = await testServer.post('/city').send({name: 'Petrópolis', state: 'RJ'});
    expect(result1.statusCode).toEqual(StatusCodes.CREATED);

    const resultFound = await testServer.get(`/city/${result1.body}`).send();

    expect(resultFound.statusCode).toEqual(StatusCodes.OK);
    expect(resultFound.statusCode).toHaveProperty([]);
  });

  it('Try to get a register that does not exist', async () => {
    const result1 = await testServer.get('/city/99999').send();
    expect(result1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(result1.body).toHaveProperty('errors.default');
  });
});