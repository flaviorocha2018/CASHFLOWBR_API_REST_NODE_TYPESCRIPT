import { ETableNames } from '../../database/ETableNames';
import { IUser } from '../../database/models';
import { Knex } from '../../database/knex';


export const validateUser = async (id: number): Promise<IUser | Error> => {
  try {
    const result = await Knex(ETableNames.user)
      .select('*')
      .where('id', '=', id)
      .first();

    if (result) return result;

    return new Error('Register not found!');
  } catch (error) {
    console.log(error);
    return new Error('Error trying to find register');
  }
};