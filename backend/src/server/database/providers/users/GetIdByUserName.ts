import { ETableNames } from '../../ETableNames';

import { Knex } from '../../knex';
import { IUser } from '../../models';


export const getIdByUserName = async (userName: string): Promise< IUser | any > => {
  try {
    const result = await Knex(ETableNames.user)
      .select('id')
      .where('userName', '=', userName)
      .first();

    if (result) return result.id;

    if (!result) throw new Error ('UserName not Found!');
    
  } catch (error) {
    console.log(error);
  }
};