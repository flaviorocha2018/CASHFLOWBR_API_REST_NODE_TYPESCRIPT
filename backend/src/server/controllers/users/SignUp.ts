import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import * as yup from 'yup';

import { UsersProvider } from '../../database/providers/users';
import { validation } from '../../shared/middleware';
import { IUser } from '../../database/models';


interface IBodyProps extends Omit<IUser, 'id' | 'accountId' > { }

export const signUpValidation = validation((getSchema) => ({
  body: getSchema<IBodyProps>(yup.object().shape({
    userName: yup.string().required().min(3).max(100),
    email: yup.string().required().min(3).max(100),
    password: yup.string().required().min(8).matches(/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).*$/, {message: 'Password must contain at least one capital letter and one number'}),
    
  })),
}));

export const signUp = async (req: Request<{}, {}, IUser>, res: Response) => {
  const result = await UsersProvider.create(req.body);

  if (result instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: result.message
      }
    });
  }

  return res.status(StatusCodes.CREATED).json(result);
};