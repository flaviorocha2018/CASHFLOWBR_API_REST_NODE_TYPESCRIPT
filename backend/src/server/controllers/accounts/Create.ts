import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import * as yup from 'yup';

import { AccountsProvider } from '../../database/providers/accounts';
import { validation } from '../../shared/middleware';
import { IAccount } from '../../database/models';


interface IBodyProps extends Omit<IAccount, 'id'> { }

export const createValidation = validation((getSchema) => ({
  body: getSchema<IBodyProps>(yup.object().shape({
    balance: yup.number().required().default(100),
  })),
}));

export const create = async (req: Request<{}, {}, IAccount>, res: Response) => {
  const result = await AccountsProvider.create(req.body);

  if (result instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: result.message
      }
    });
  }

  return res.status(StatusCodes.CREATED).json(result);
};
