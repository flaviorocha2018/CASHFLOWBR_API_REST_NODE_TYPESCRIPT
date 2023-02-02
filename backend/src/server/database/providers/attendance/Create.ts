import { ETableNames } from '../../ETableNames';
import { IAttendance } from '../../models';
import { Knex } from '../../knex';


export const create = async (attendance: Omit<IAttendance, 'id'>): Promise<number | Error> => {
  try {
    const [{ count }] = await Knex(ETableNames.attendance)
      .where('id', '=', attendance.clientId)
      .count<[{ count: number }]>('* as count');

    if (count === 0) {
      return new Error('The client used this register was not found!');
    }

    const [result] = await Knex(ETableNames.attendance).insert(attendance).returning('id');

    if (typeof result === 'object') {
      return result.id;
    } else if (typeof result === 'number') {
      return result;
    }

    return new Error('Error to create this register');
  } catch (error) {
    console.log(error);
    return new Error('Error trying to insert this register');
  }
};