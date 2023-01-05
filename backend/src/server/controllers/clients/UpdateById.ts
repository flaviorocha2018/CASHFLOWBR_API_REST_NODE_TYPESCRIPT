import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import * as yup from 'yup';

import { ClientsProvider } from '../../database/providers/client'; 
import { validation } from '../../shared/middleware';
import { IClient } from '../../database/models';


interface IParamProps {
  id?: number;
}

interface IBodyProps extends Omit<IClient, 'id'> { }

export const updateByIdValidation = validation(get => ({
  body: get<IBodyProps>(yup.object().shape({
    email: yup.string().required().email(),
    cityId: yup.number().integer().required(),
    name: yup.string().required().min(3),
    lastName: yup.string().required().min(3),
  })),
  params: get<IParamProps>(yup.object().shape({
    id: yup.number().integer().required().moreThan(0),
  })),
}));

export const updateById = async (req: Request<IParamProps, {}, IBodyProps>, res: Response) => {
  if (!req.params.id) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      errors: {
        default: 'The parameter "id" must be informed.'
      }
    });
  }

  const result = await ClientsProvider.updateById(req.params.id, req.body);
  if (result instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: result.message
      }
    });
  }

  return res.status(StatusCodes.NO_CONTENT).json(result);
};