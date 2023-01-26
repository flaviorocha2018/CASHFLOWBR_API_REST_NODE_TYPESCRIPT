import { StatusCodes } from 'http-status-codes';
import { Request, Response } from 'express';
import * as yup from 'yup';
import { TransactionsProvider } from './../../database/providers/transactions';
import { validation } from '../../shared/middleware';
import { ITransactions } from './../../database/models';

interface IBodyProps extends Omit<ITransactions, 'id' | 'creditedAt'> { }

export const createValidation = validation(get => ({
  body: get<IBodyProps>(yup.object().shape({
    debitedAccountId: yup.number().integer().required(),
    creditedAccountId: yup.number().integer().required(),
    value: yup.number().required(),
  }))
}));

export const create = async (req: Request, res: Response ): Promise<Response> => {
  const { username: usernameCashOut } = req.headers;
  const { username, value } = req.body;
  
  console.log('username: ', usernameCashOut );
  console.log('username: ', username, 'valor: ', value);
  const transaction = await 
  TransactionsProvider.createTransaction({username, value}, usernameCashOut as string );

  if (transaction instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: transaction.message
      }
    });
  }

  return res.status(StatusCodes.CREATED).json(transaction);
};
