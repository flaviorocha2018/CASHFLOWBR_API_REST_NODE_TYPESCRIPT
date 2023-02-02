import { ETableNames } from '../../ETableNames';
import { IBilling } from '../../models';
import { Knex } from '../../knex';


export const updateById = async (id: number, billing: Omit<IBilling, 'id'>): Promise<void | Error> => {
  try {
    const [{ count }] = await Knex(ETableNames.client)
      .where('id', '=', billing.clientId)
      .count<[{ count: number }]>('* as count');

    if (count === 0) {
      return new Error('The client used was not found!');
    }

    const result = await Knex(ETableNames.billings)
      .update(billing)
      .where('id', '=', id);

    if (result > 0) return;

    return new Error('Error updating this billing');
  } catch (error) {
    console.log(error);
    return new Error('Error trying to update this register');
  }
};