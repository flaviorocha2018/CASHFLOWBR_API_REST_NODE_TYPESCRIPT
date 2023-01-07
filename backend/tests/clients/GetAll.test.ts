import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';


describe('Clients - GetAll', () => {
  let cityId: number | undefined = undefined;
  beforeAll(async () => {
    const resCity= await testServer
      .post('/city')
      .send({ name: 'Teste' });

    cityId = resCity.body;
  });


  it('Get registers', async () => {
    const res1 = await testServer
      .post('/clients')
      .send({
        cityId,
        email: 'testegetall@gmail.com',
        name: 'Teste',
        lastName: 'Silva',
      });
    expect(res1.statusCode).toEqual(StatusCodes.CREATED);

    const resGotALL = await testServer
      .get('/clients')
      .send();
    expect(Number(resGotALL.header['x-total-count'])).toBeGreaterThan(0);
    expect(resGotALL.statusCode).toEqual(StatusCodes.OK);
    expect(resGotALL.body.length).toBeGreaterThan(0);
  });
});