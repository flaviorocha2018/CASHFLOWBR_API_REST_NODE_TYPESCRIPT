import { ETableNames } from '../../ETableNames';
import { IClient } from '../../models';
import { Knex } from '../../knex';


export const getById = async (id: number): Promise<IClient | Error> => {
  try {
    const result = await Knex(ETableNames.client)
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