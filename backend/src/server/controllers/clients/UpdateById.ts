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
    corporateName: yup.string().required().min(2),
    address: yup.string().required(),
    complement: yup.string().required(),
    neighborhood: yup.string().required(),
    cityId: yup.number().integer().required(),
    email: yup.string().required().email(),
    cnpj: yup.string().required(),
    inscrState: yup.string().required(),
    inscrCity: yup.string().required(),
    cnaeId: yup.number().integer().required(),
    typeOfBusiness: yup.string().required(),
    contactName: yup.string().required(),
    celular1: yup.number().required(),
    celular2: yup.number().notRequired(),
    telephone: yup.number().notRequired(),
    sinceDate: yup.date().required(),
    url: yup.string().notRequired(),
    salesManId: yup.number().integer().notRequired(),
    statusId: yup.number().integer().required(),
    contractNumber: yup.number().notRequired(),
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