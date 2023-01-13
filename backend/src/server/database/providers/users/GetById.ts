import { ETableNames } from '../../ETableNames';
import { IUser } from '../../models';
import { Knex } from '../../knex';


export const getById = async (id: number): Promise<IUser | Error> => {
  try {
    const result = await Knex(ETableNames.user)
      .select('*')
      .where('id', '=', id)
      .first();

    if (result?.id) return result;

    return new Error('Register not found!');
  } catch (error) {
    console.log(error);
    return new Error('Error trying to find register');
  }
};