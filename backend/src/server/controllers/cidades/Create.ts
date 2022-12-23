import { Request, Response } from 'express';
import * as yup from 'yup';

import { validation } from '../../shared/middleware';
import { StatusCodes } from 'http-status-codes';


interface ICidade {
  name: string;
  state: string;
}

// schema of data validation 
export const createValidation = validation((getSchema) => ({
  body: getSchema<ICidade>(yup.object().shape({
    name: yup.string().required().min(3),
    state: yup.string().required().min(2),
  })),
 
}));

export const create = async (req: Request<{}, {}, ICidade>, res: Response) => {
  console.log(req.body);


  return res.status(StatusCodes.CREATED).json(1);
};