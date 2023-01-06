import { ETableNames } from '../../ETableNames';
import { ICity } from '../../models';
import { Knex } from '../../knex';


export const create = async (city: Omit<ICity, 'id'>): Promise<number | Error> => {
  try {
    const [result] = await Knex(ETableNames.cities).insert(city).returning('id');

    if (typeof result === 'object') {
      return result.id;
    } else if (typeof result === 'number') {
      return result;
    }

    return new Error('Error inserting a new register');
  } catch (error) {
    console.log(error);
    return new Error('Error trying to insert a new register');
  }
};