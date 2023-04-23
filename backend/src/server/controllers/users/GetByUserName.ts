import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import * as yup from 'yup';

import { UsersProvider } from './../../database/providers/users';
import { validation } from '../../shared/middleware';


interface IParamProps {
  userName: string;
}
export const getByIdValidation = validation(get => ({
  params: get<IParamProps>(yup.object().shape({
    userName: yup.string().required().min(3),
  })),
}));

export const getByUserName = async (req: Request<IParamProps>, res: Response) => {
  if (!req.params.userName) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      errors: {
        default: 'The parameter "userName" must be informed.'
      }
    });
  }

  const result = await UsersProvider.getByUserName(req.params.userName);
  if (result instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: result.message
      }
    });
  }

  return res.status(StatusCodes.OK).json(result);
};