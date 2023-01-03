import { Request, Response } from 'express';
import * as yup from 'yup';
import { CityProvider } from '../../database/providers/city';
import { validation } from '../../shared/middleware';
import { StatusCodes } from 'http-status-codes';
import { ICity } from '../../database/models';


interface IBodyProps extends Omit<ICity, 'id'> {}

// schema of data validation 
export const createValidation = validation((getSchema) => ({
  body: getSchema<IBodyProps>(yup.object().shape({
    name: yup.string().required().min(3).max(150),
    state: yup.string().required().min(2),
  })),
 
}));

export const create = async (req: Request<{}, {}, ICity>, res: Response) => {
  const result = await CityProvider.create(req.body);
  console.log(result);
  if (result instanceof Error){
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: result.message
      }
    });
  }

  return res.status(StatusCodes.CREATED).json(result);
};