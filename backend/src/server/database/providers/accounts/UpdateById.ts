import { ETableNames } from '../../ETableNames';
import { IAccount } from '../../models';
import { Knex } from '../../knex';


export const updateById = async (id: number, account: Omit<IAccount, 'id'>): Promise<void | Error> => {
  try {
    const result = await Knex(ETableNames.accounts)
      .update(account)
      .where('id', '=', id);

    if (result > 0) return;

    return new Error('Error to update this register');
  } catch (error) {
    console.log(error);
    return new Error('Error trying  to update this register');
  }
};