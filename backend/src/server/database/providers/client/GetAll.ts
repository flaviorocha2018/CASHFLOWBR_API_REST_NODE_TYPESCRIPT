import { ETableNames } from '../../ETableNames';
import { IClient} from '../../models';
import { Knex } from '../../knex';


export const getAll = async (page: number, limit: number, filter: string): Promise<IClient[] | Error> => {
  try {
    const result = await Knex(ETableNames.client)
      .select('*')
      .where('name', 'like', `%${filter}%`)
      .offset((page - 1) * limit)
      .limit(limit);

    return result;
  } catch (error) {
    console.log(error);
    return new Error('Error in finding this register');
  }
};