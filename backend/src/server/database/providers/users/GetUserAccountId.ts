import { ETableNames } from '../../ETableNames';
import { IUser } from '../../models';
import { Knex } from '../../knex';


export const getUserAccountId = async (id: number): Promise< number | any> => {
  try {
    const result = await Knex(ETableNames.user)
      .select('*')
      .where('id', '=', id)
      .first();

    if (result?.accountId) return result.accountId;

    return new Error('Register not found!');
  } catch (error) {
    console.log(error);
    return new Error('Error trying to find register');
  }
};