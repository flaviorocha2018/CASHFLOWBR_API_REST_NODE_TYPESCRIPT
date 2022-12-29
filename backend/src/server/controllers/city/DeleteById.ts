import { Request, Response } from 'express';
import * as yup from 'yup';
import { validation } from '../../shared/middleware';
import { StatusCodes } from 'http-status-codes';

// limiting request by page.
interface IParamProps {
  id?: number;

}

// schema of data validation 
export const deleteByIdValidation = validation(getSchema => ({
  params: getSchema<IParamProps>(yup.object().shape({
    id: yup.number().integer().required().moreThan(0),
  })),
 
}));

export const deleteById = async (req: Request<IParamProps>, res: Response) => {
  if (Number(req.params.id) === 99999) return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    errors: { default: 'register not found!'}
  });


  return res.status(StatusCodes.NO_CONTENT).send();
};