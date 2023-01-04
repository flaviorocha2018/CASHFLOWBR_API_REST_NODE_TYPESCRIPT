import { ETableNames } from '../../ETableNames';
import { IClient } from '../../models';
import { Knex } from '../../knex';


export const updateById = async (id: number, client: Omit<IClient, 'id'>): Promise<void | Error> => {
  try {
    const [{ count }] = await Knex(ETableNames.city)
      .where('id', '=', client.cityId)
      .count<[{ count: number }]>('* as count');

    if (count === 0) {
      return new Error('The city used was not found!');
    }

    const result = await Knex(ETableNames.client)
      .update(client)
      .where('id', '=', id);

    if (result > 0) return;

    return new Error('Error updating this client');
  } catch (error) {
    console.log(error);
    return new Error('Error trying to update this register');
  }
};