import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';


describe('Cidades - GetAll', () => {

  it('Get All  existing registers', async () => {
    const result1 = await testServer.post('/cidades').send({name: 'Petrópolis', state: 'RJ'});
    expect(result1.statusCode).toEqual(StatusCodes.CREATED);

    const resultCreated = await testServer.get('/cidades').send();

    expect(Number(resultCreated.header[`x-total-count`])).toBeGreaterThan(0);
    expect(resultCreated.statusCode).toEqual(StatusCodes.OK);
    expect(resultCreated.body.length).toBeGreaterThan(0);
  });

});