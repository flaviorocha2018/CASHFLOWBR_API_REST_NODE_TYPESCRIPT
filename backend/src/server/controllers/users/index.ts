import * as signIn from './SignIn';
import * as signUp from './SignUp';
import * as getIdByUserName from './GetIdByUserName';



export const UsersController = {
  ...signIn,
  ...signUp,
  ...getIdByUserName,

 
};