import { ETableNames } from '../../ETableNames';
import { IAccount } from '../../models';
import { Knex } from '../../knex';


export const getBalance= async (id: number): Promise<IAccount | Error> => {
  try {
    // const result = await Knex(ETableNames.accounts)
    //   .select('*')
    //   .where('id', '=', id)
    //   .first();

    // if (result?.balance) return result;
    const userBalance =await Knex(ETableNames.accounts).select('balance')
      .where('id', '=', id)
      .first();

    const [result] = await Knex(ETableNames.accounts).select('*').columns('id', 'balance')
      .where('id', '=', id)
      .first();

    // const idBalance = result.balance;
    if (result) return result.balance;
    if (userBalance > 0) return userBalance.balance;
   
    return new Error('Register not found!');
  } catch (error) {
    console.log(error);
    return new Error('Error trying to find register');
  }

};