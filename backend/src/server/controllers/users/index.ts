import * as signIn from './SignIn';
import * as signUp from './SignUp';
import * as getIdByUserName from './GetIdByUserName';
import * as getUserAccountId from './GetUserAccountId';



export const UsersController = {
  ...signIn,
  ...signUp,
  ...getIdByUserName,
  ...getUserAccountId,
 
};