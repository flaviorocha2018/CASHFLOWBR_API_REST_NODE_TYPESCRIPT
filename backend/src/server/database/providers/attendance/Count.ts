import { ETableNames } from '../../ETableNames';
import { Knex } from '../../knex';


export const count = async (filter = ''): Promise<number | Error> => {
  try {
    const [{ count }] = await Knex(ETableNames.attendance)
      .where('clientId', 'like', `%${filter}%`)
      .count<[{ count: number }]>('* as count');

    // Aqui Deve se buscar o nome do cliente = ao clientId.

    if (Number.isInteger(Number(count))) return Number(count);

    return new Error('Error consulting the total registers');
  } catch (error) {
    console.log(error);
    return new Error('Error consulting the total registers');
  }
};