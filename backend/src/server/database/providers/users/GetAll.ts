import { ETableNames } from '../../ETableNames';
import { IUser } from '../../models';
import { Knex } from '../../knex';


export const getAll = async (page: number, limit: number, filter: string, id = 0): Promise<IUser[] | Error> => {
  try {
    const result = await Knex(ETableNames.user)
      .select('*')
      .orderBy('id', 'asc')
      // .where('id', Number(id))
      .orWhere('userName', 'like', `%${filter}%`)
      .offset((page - 1) * limit)
      .limit(limit);

    if (id > 0 && result.every(item => item.id !== id)) {
      const resultById = await Knex(ETableNames.user)
        .select('*')
        .where('id', '=', Number(id) )
        .first();

      if (resultById) return [...result, resultById];
    }

    return result;
  } catch (error) {
    console.log(error);
    return new Error('Error trying to get all registers');
  }
};