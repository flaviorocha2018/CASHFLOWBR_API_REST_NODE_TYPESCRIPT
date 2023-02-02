import { ETableNames } from '../../ETableNames';
import { Knex } from '../../knex';


export const count = async (filter = ''): Promise<number | Error> => {
  try {
  // Aqui devemos pegar o nome do cliente pela tabela client
  
    const [{ count }] = await Knex(ETableNames.billings)
      .where('clientId', 'like', `%${filter}%`)
      .count<[{ count: number }]>('* as count');

    if (Number.isInteger(Number(count))) return Number(count);

    return new Error('Error consulting total registers');
  } catch (error) {
    console.log(error);
    return new Error('Error trying to consult the total registers');
  }
};