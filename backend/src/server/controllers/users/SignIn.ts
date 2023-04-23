import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import * as yup from 'yup';

import { UsersProvider } from '../../database/providers/users';
import { validation } from '../../shared/middleware';
import { IUser } from '../../database/models';
import { authenticateUser }  from '../../shared/services/Authenticate';
import { JWTService } from '../../shared/services';
import { createToken } from '../../shared/middleware/auth';


interface IBodyProps extends Omit<IUser, 'id' | 'email'> { }

export const signInValidation = validation((getSchema) => ({
  body: getSchema<IBodyProps>(yup.object().shape({
    userName: yup.string().required().min(3).max(100),
    password: yup.string().required().min(8).matches(/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).*$/, {message: 'Password must contain at least one capital letter, a letter and one number'}),
    
  })),
}));

export const signIn = async (req: Request<{}, {}, IBodyProps>, res: Response) => {
  
  const {userName, password} = req.body;
  const userId = await UsersProvider.getIdByUserName(req.body.userName);
  // Making comparison of password and hashedPassword from DB
  console.log('Form signin: ', userName);
  const result = await authenticateUser(userName, password);

  if (result instanceof Error) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      errors: {
        default: 'invalid userName or password'
      }
    });
  }

  if (! password ) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      errors: {
        default: 'invalid userName or password'
      }
    });
  } else {
    const token = createToken(userId);
    console.log('token:', token);
    const accessToken = token;
    // const accessToken = JWTService.signIn({uid: userId});
    if (accessToken === 'JWT_SECRET_NOT_FOUND'){
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        errors: {
          default: 'Erro ao gerar o access token!'
        }
      });
    }
   

    return res.status(StatusCodes.OK).json({ accessToken });
  }

  // return res.status(StatusCodes.CREATED).json(result);
};