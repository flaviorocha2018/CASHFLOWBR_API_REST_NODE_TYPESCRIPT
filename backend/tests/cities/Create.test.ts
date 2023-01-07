import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';



describe('City - Create', () => {

  it('Insert a new register', async () => {
    const result1 = await testServer.post('/city').send({name: 'Petrópolis', state: 'RJ'});
    expect(result1.statusCode).toEqual(StatusCodes.CREATED);
    expect(typeof result1.body).toEqual('number');
  });

  it('Try to insert a new register with a short name', async () => {
    const result1 = await testServer.post('/city').send({name: 'Pe', state: 'RJ'});
    expect(result1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(result1.body).toHaveProperty('errors.body.name');
  });
});