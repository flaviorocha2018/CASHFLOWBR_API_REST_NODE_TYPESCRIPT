import * as signIn from './SignIn';
import * as signUp from './SignUp';
import * as getUserAccountId from './GetUserAccountId';



export const UsersController = {
  ...signIn,
  ...signUp,
  ...getUserAccountId,
 
};