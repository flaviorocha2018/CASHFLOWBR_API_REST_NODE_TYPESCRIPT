import * as signIn from './SignIn';
import * as signUp from './SignUp';
import * as getIdByUserName from './GetIdByUserName';
import * as getByUserName from './GetByUserName';
import * as getAll from './GetAll';



export const UsersController = {
  ...signIn,
  ...signUp,
  ...getIdByUserName,
  ...getByUserName,
  ...getAll,
 
};