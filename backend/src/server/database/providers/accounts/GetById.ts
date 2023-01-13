import { ETableNames } from '../../ETableNames';
import { IAccount } from '../../models';
import { Knex } from '../../knex';


export const getById = async (id: number): Promise<IAccount | Error> => {
  try {
    const result = await Knex(ETableNames.accounts)
      .select('*')
      .where('id', '=', id)
      .first();

    if (result) return result;

    return new Error('Register not found');
  } catch (error) {
    console.log(error);
    return new Error('Error trying to find this register');
  }
};