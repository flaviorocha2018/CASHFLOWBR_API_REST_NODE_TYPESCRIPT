import * as getByEmail from './GetByEmail';
import * as getByUserName from './GetByUserName';
import * as create from './Create';
import * as authenticateUser from './Authenticate';
import * as ValidateUser from './ValidateUser';



export const UsersProvider = {
  ...getByEmail,
  ...getByUserName,
  ...create,
  ...authenticateUser,
  ...ValidateUser,

};