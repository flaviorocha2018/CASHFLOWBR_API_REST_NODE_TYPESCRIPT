import * as getByEmail from './GetByEmail';
import * as getByUserName from './GetByUserName';
import * as create from './Create';
import * as getById from './GetById';
import * as getIdByUserName from './GetIdByUserName';
import * as getUserAccountId from './GetUserAccountId';
import * as authenticateUser from '../../../shared/services';
import * as ValidateUser from '../../../shared/services';



export const UsersProvider = {
  ...getByEmail,
  ...getByUserName,
  ...create,
  ...getById,
  ...getIdByUserName,
  ...getUserAccountId,
  ...authenticateUser,
  ...ValidateUser,

};