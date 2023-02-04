import { StatusCodes } from 'http-status-codes';
import { Request, Response } from 'express';
import * as yup from 'yup';

import { ClientsProvider } from './../../database/providers/client';
import { validation } from '../../shared/middleware';
import { IClient } from './../../database/models';


interface IBodyProps extends Omit<IClient, 'id'> { }

export const createValidation = validation(get => ({
  body: get<IBodyProps>(yup.object().shape({
    corporateName: yup.string().required().min(2),
    address: yup.string().required(),
    complement: yup.string().required(),
    neighborhood: yup.string().required(),
    cityId: yup.number().integer().required(),
    email: yup.string().required().email(),
    cnpj: yup.number().integer().required(),
    inscrState: yup.number().required(),
    inscrCity: yup.number().required(),
    cnae: yup.number().integer().required(),
    typeOfBusiness: yup.string().required(),
    contactName: yup.string().required(),
    celular1: yup.number().required(),
    celular2: yup.number().notRequired(),
    telephone: yup.number().notRequired(),
    sinceDate: yup.date().notRequired(),
    url: yup.string().notRequired(),
    salesManId: yup.number().integer().notRequired(),
    status: yup.number().integer().required(),
    contractNumber: yup.number().notRequired(),
  })),
}));

export const create = async (req: Request<{}, {}, IBodyProps>, res: Response) => {
  const result = await ClientsProvider.create(req.body);

  if (result instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: result.message
      }
    });
  }

  return res.status(StatusCodes.CREATED).json(result);
};