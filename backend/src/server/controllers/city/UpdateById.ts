import { Request, Response } from 'express';
import * as yup from 'yup';
import { validation } from '../../shared/middleware';
import { StatusCodes } from 'http-status-codes';
import { ICity } from '../../database/models';

// limiting request by page.
interface IParamProps {
  id?: number;
}

interface IBodyProps extends Omit<ICity, 'id'> {}

// schema of data validation 
export const UpdateByIdValidation = validation(getSchema => ({
  body: getSchema<IBodyProps>(yup.object().shape({
    name: yup.string().required().min(3),
    state: yup.string().required().min(2),
  })),
  params: getSchema<IParamProps>(yup.object().shape({
    id: yup.number().integer().required().moreThan(0),
  })),
 
}));

export const updateById = async (req: Request<IParamProps, {}, IBodyProps>, res: Response) => {
  if (Number(req.params.id) === 99999) return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    errors: {
      default: 'Register Not Found!'
    }
  });

  return res.status(StatusCodes.NO_CONTENT).send();
};