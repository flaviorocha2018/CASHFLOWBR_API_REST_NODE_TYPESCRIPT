import { ETableNames } from '../../ETableNames';
import { IUser } from '../../models';
import { Knex } from '../../knex';
import  bcrypt from 'bcrypt';
import { createToken } from '../../../shared/middleware/auth';


export const create = async (user: Omit<IUser, 'id'>): Promise<number | Error | Object> => {
  try {
    // Verify if user exist.
    const userExist = await Knex(ETableNames.user).select('userName').from(ETableNames.user).where({userName: user.userName});
    console.log(userExist);
    if (userExist.length > 0)  return new Error('This name has already been used!');

    // making password hash 
    const password = user.password;
    const hash = await bcrypt.hash(password, 10);
    user.password = hash;
    console.log(password, hash);
    
    // Create an account and get accountId
    const accountId  = await Knex(ETableNames.accounts).insert({}).returning('id');
    user.accountId = accountId[0].id;
    console.log(accountId);


    // Create an user with an accountId and default value of 100.
    const [result] = await Knex(ETableNames.user).insert(user).returning('id');
    
    // Create a token
    const token = createToken({id: result.id,  username: user.userName});
    console.log('token', token);

    return {
      token,
      user: {
        id: result.id, 
        username: user.userName,
        email: user.email, 
        accountId:  user.accountId
      }
    };
   
    // return result.id;

    // function public authenticateUser = async (request: ICreateUser)



    // validate user by id

    // return result.id;

    // if (typeof result === 'object') {
    //   return result.id;
    // } else if (typeof result === 'number') {
    //   return result;
    // }

    // return new Error('Error inserting a new user');
  } catch (error) {
    console.log(error);
    return new Error('Error trying to insert a new register');
  }

  
};