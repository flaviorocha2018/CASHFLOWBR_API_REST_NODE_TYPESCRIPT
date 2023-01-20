import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import * as yup from 'yup';

import { UsersProvider } from './../../database/providers/users';
import { validation } from '../../shared/middleware';


interface IParamProps {
  id?: number;
}
export const getAccountByIdValidation = validation(get => ({
  params: get<IParamProps>(yup.object().shape({
    id: yup.number().integer().required().moreThan(0),
  })),
}));

export const getUserAccountId = async (req: Request<IParamProps>, res: Response) => {
  if (!req.params.id) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      errors: {
        default: 'The parameter "id" must be informed.'
      }
    });
  }

  const result = await UsersProvider.getUserAccountId(req.params.id);
  console.log('id:', result);
  if (result instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: result.message
      }
    });
  }

  return res.status(StatusCodes.OK).json(result);
};