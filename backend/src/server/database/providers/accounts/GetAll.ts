import { ETableNames } from '../../ETableNames';
import { IAccount } from '../../models';
import { Knex } from '../../knex';


export const getAll = async (page: number, limit: number, filter: string, id = 0): Promise<IAccount[] | Error> => {
  try {
    const result = await Knex(ETableNames.accounts)
      .select('*')
      .orderBy('id', 'asc')
      // .where('id', Number(id))
      // .orWhere('name', 'like', `%${filter}%`)
      .offset((page - 1) * limit)
      .limit(limit);

    if (id > 0 && result.every(item => item.id !== id)) {
      const resultById = await Knex(ETableNames.accounts)
        .select('*')
        .where('id', '=', Number(id) )
        .first();

      if (resultById) return [...result, resultById];
    }

    return result;
  } catch (error) {
    console.log(error);
    return new Error('Error trying to get all accounts');
  }
};