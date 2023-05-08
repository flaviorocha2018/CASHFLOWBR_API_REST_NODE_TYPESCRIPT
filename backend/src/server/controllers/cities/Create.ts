import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import * as yup from 'yup';

import { CityProvider } from '../../database/providers/cities';
import { validation } from '../../shared/middleware';
import { ICity } from '../../database/models';


interface IBodyProps extends Omit<ICity, 'id'> { }

export const createValidation = validation((getSchema) => ({
  body: getSchema<IBodyProps>(yup.object().shape({
    name: yup.string().required().min(3).max(150),
    state: yup.string().required().min(2).max(2),
  })),
}));

export const create = async (req: Request<{}, {}, ICity>, res: Response) => {
  console.log('reqBody Create: ', req.body);

  const result = await CityProvider.create(req.body);

  if (result instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: result.message
      }
    });
  }

  return res.status(StatusCodes.CREATED).json(result);
};
