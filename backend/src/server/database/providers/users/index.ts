import * as getByEmail from './GetByEmail';
import * as GetByUserName from './GetByUserName';
import * as create from './Create';



export const UsersProvider = {
  ...getByEmail,
  ...GetByUserName,
  ...create,

};