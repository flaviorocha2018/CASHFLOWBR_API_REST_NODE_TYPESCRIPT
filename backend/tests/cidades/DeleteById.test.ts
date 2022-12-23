import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';


describe('Cidades - Delete', () => {

  it('Delete a existing register', async () => {
    const result1 = await testServer.post('/cidades').send({name: 'Petrópolis', state: 'RJ'});
    expect(result1.statusCode).toEqual(StatusCodes.CREATED);

    const resultDeleted = await testServer.delete(`/cidades/${result1.body}`).send();
    expect(resultDeleted.statusCode).toEqual(StatusCodes.NO_CONTENT);
  });

  it('Try to delete a register that does not exist', async () => {
    const result1 = await testServer.delete('/cidades/99999').send();
    expect(result1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(result1.body).toHaveProperty('errors.default');
  });
});