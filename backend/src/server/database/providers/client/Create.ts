import { ETableNames } from '../../ETableNames';
import { IClient} from '../../models';
import { Knex } from '../../knex';


export const create = async (client: Omit<IClient, 'id'>): Promise<number | Error> => {
  try {
    const [{ count }] = await Knex(ETableNames.cities)
      .where('id', '=', client.cityId)
      .count<[{ count: number }]>('* as count');

    if (count === 0) {
      return new Error('The city used this register was not found!');
    }

    const [result] = await Knex(ETableNames.client).insert(client).returning('id');

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