import { ETableNames } from '../../ETableNames';
import { IAccount } from '../../models';
import { Knex } from '../../knex';



export const create = async (account: Omit<IAccount, 'id'>): Promise<number | Error | undefined> => {
  try {
    const [result] = await Knex(ETableNames.accounts).insert(account).returning('id');

    if (typeof result === 'object') {
      return result.id;
    } else if (typeof result === 'number') {
      return result;
    }

    return new Error('Error inserting a new register');
  } catch (error) {
    console.log(error);
    return new Error('Error trying to insert a new register');
  }
};