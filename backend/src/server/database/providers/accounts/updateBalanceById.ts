import { ETableNames } from '../../ETableNames';
import { IAccount } from '../../models';
import { Knex } from '../../knex';


export const updateBalanceById = async (id: number, balance: Omit<IAccount, 'id'>): Promise<number | Error > => {
  try {
    const result = await Knex(ETableNames.accounts)
      .update(balance)
      .where('id', '=', id);

    if (result > 0) return result;

    return new Error('Error to update this register');
  } catch (error) {
    console.log(error);
    return new Error('Error trying  to update this register');
  }
};