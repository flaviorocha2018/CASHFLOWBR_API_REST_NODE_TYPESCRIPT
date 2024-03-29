import { ETableNames } from '../../database/ETableNames';
import { IUser } from '../../database/models';
import { Knex } from '../../database/knex';
import bcrypt  from 'bcrypt';
import { createToken } from '../../shared/middleware/auth';


export const authenticateUser = async (userName: string, password: string): Promise<IUser | Error | Object> => {

  const result = await Knex(ETableNames.user)
    .select('userName', 'password', 'id', 'email')
    .from(ETableNames.user)
    .where('userName', '=', userName)
    .first();

  if(!result) throw new Error('Invalid user or password');

  const isMatch = await bcrypt.compare(password as string, result.password);
  if (!isMatch) throw new Error('Invalid user or password');

  const token = createToken({id: result.id,  username: result.userName});  

  return {
    token,
    user: {
      id: result.id, 
      username:  result.userName,
      email: result.email, 
    }
  };
};
