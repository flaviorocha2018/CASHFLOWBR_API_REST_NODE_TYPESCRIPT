import { ETableNames } from '../../ETableNames';
import { Knex } from '../../knex';


export const deleteById = async (id: number): Promise< void | Error > => {
  try {
    const result = await Knex(ETableNames.cities)
      .where('id', '=', id )
      .del();

    if (result > 0) return;

    return new Error('Error Trying to delete a record');
  } catch (error) {
    console.log(error);
    return new Error('Error deleting a record');
  }
};