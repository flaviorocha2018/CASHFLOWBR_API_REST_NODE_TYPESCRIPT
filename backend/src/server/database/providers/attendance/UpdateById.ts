import { ETableNames } from '../../ETableNames';
import { IAttendance } from '../../models';
import { Knex } from '../../knex';


export const updateById = async (id: number, attendance: Omit<IAttendance, 'id'>): Promise<void | Error> => {
  try {
    const [{ count }] = await Knex(ETableNames.client)
      .where('id', '=', attendance.clientId)
      .count<[{ count: number }]>('* as count');

    if (count === 0) {
      return new Error('The client used was not found!');
    }

    const result = await Knex(ETableNames.attendance)
      .update(attendance)
      .where('id', '=', id);

    if (result > 0) return;

    return new Error('Error updating this attendance');
  } catch (error) {
    console.log(error);
    return new Error('Error trying to update this register');
  }
};