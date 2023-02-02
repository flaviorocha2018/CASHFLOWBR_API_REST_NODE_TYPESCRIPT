import { ETableNames } from '../../ETableNames';
import { Knex } from '../../knex';


export const deleteById = async (id: number): Promise<void | Error> => {
  try {
    const result = await Knex(ETableNames.attendance)
      .where('id', '=', id)
      .del();

    if (result > 0) return;

    return new Error('Error deleting register');
  } catch (error) {
    console.log(error);
    return new Error('Error trying to delete this register');
  }
};