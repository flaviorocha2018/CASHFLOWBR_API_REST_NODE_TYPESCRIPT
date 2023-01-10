import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import * as yup from 'yup';

import { UsersProvider } from '../../database/providers/users';
import { validation } from '../../shared/middleware';
import { IUser } from '../../database/models';


interface IBodyProps extends Omit<IUser, 'id' | 'email' | 'accountId'> { }

export const signInValidation = validation((getSchema) => ({
  body: getSchema<IBodyProps>(yup.object().shape({
    userName: yup.string().required().min(3).max(100),
    password: yup.string().required().min(8).matches(/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).*$/, {message: 'Password must contain at least one capital letter and one number'}),
    
  })),
}));

export const signIn = async (req: Request<{}, {}, IBodyProps>, res: Response) => {
  
  const {userName, password} = req.body;
  
  
  const result = await UsersProvider.getByUserName(userName);

  if (result instanceof Error) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      errors: {
        default: 'invalid userName or password'
      }
    });
  }

  if (password !== result.password) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      errors: {
        default: 'invalid userName or password'
      }
    });
  } else {
    return res.status(StatusCodes.OK).json({ accessToken: 'teste.teste.teste'});
  }


  // return res.status(StatusCodes.CREATED).json(result);
};