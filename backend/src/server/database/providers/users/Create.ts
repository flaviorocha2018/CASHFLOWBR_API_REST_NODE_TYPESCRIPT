import { ETableNames } from '../../ETableNames';
import { IUser } from '../../models';
import { Knex } from '../../knex';
import  bcrypt from 'bcrypt';
import { createToken } from '../../../shared/middleware/auth';
import { PasswordCrypto } from '../../../shared/services';


export const create = async (user: Omit<IUser, 'id'>): Promise<number | Error | Object> => {
  try {
    // Verify if user exist.
    const userExist = await Knex(ETableNames.user).select('userName').from(ETableNames.user).where({userName: user.userName});
   
    if (userExist.length > 0)  return new Error('This name has already been used!');

    // making password hash to save in DB
    const hashPassword = await PasswordCrypto.hashPassword(user.password);
    // another way of hashing password
    // const password = user.password;
    // const hashPassword = await bcrypt.hash(password, 10);
    // user.password = hashPassword;
   
  
    // Create an user 
    const [result] = await Knex(ETableNames.user).insert({...user, password: hashPassword}).returning('id');
    
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
    
    
  } catch (error) {
    console.log(error);
    return new Error('Error trying to insert a new register');
  }

};