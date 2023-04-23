import * as getByEmail from './GetByEmail';
import * as getByUserName from './GetByUserName';
import * as create from './Create';
import * as getById from './GetById';
import * as getIdByUserName from './GetIdByUserName';
import * as authenticateUser from '../../../shared/services';
import * as ValidateUser from '../../../shared/services';
import * as getAll from './GetAll';
import * as count from './Count';



export const UsersProvider = {
  ...getByEmail,
  ...getByUserName,
  ...create,
  ...getById,
  ...getIdByUserName,
  ...authenticateUser,
  ...ValidateUser,
  ...getAll,
  ...count,

};