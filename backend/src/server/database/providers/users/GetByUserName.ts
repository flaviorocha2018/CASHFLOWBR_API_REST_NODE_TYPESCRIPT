import { ETableNames } from '../../ETableNames';
import { IUser } from '../../models';
import { Knex } from '../../knex';


export const getByUserName = async (userName: string): Promise<IUser | Error> => {
  try {
    const result = await Knex(ETableNames.user)
      .select('*')
      .where('userName', '=', userName)
      .first();

    if (result?.userName) return result;

    return new Error('Register not found');
  } catch (error) {
    console.log(error);
    return new Error('Error trying to find this register');
  }
};