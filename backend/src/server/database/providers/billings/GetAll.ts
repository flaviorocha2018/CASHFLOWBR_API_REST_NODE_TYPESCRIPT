import { ETableNames } from '../../ETableNames';
import { IBilling} from '../../models';
import { Knex } from '../../knex';


export const getAll = async (page: number, limit: number, filter: string): Promise<IBilling[] | Error> => {
  try {
    const result = await Knex(ETableNames.billings)
      .select('*')
      .where('clientId', 'like', `%${filter}%`)
      .orderBy('id', 'asc')
      .offset((page - 1) * limit)
      .limit(limit);

    return result;
  } catch (error) {
    console.log(error);
    return new Error('Error in finding this register');
  }
};