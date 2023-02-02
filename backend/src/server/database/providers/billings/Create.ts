import { ETableNames } from '../../ETableNames';
import { IBilling} from '../../models';
import { Knex } from '../../knex';


export const create = async (billing: Omit<IBilling, 'id'>): Promise<number | Error> => {
  try {
    const [{ count }] = await Knex(ETableNames.client)
      .where('id', '=', billing.clientId)
      .count<[{ count: number }]>('* as count');

    if (count === 0) {
      return new Error('The client used this register was not found!');
    }

    const [result] = await Knex(ETableNames.billings).insert(billing).returning('id');

    if (typeof result === 'object') {
      return result.id;
    } else if (typeof result === 'number') {
      return result;
    }

    return new Error('Error to create this register');
  } catch (error) {
    console.log(error);
    return new Error('Error trying to insert this register');
  }
};