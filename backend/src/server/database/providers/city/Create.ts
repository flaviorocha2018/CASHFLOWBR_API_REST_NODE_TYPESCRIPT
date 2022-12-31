import knex from 'knex';
import { ICity } from '../../models';
import { ETableNames } from '../../ETableNames';


export const create = async (city: Omit<ICity, 'id'>): Promise<number | Error>  => {
  try {
    const [result] = await knex(ETableNames.city).insert(city).returning('id');

    if (typeof result === 'object'){
      return result.id;
    } else if (typeof result === 'number'){
      return result;
    }

    return new Error('Error trying to insert a new register');
  } catch (error) {
    console.log('try catch create Provider', error);
    return new Error('Error to insert a new register');
  }

};