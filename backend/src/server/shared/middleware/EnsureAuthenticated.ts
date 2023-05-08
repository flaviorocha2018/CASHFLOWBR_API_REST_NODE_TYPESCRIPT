import { RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';

import { JWTService } from '../services';
import { verifyToken } from './auth';


export const ensureAuthenticated: RequestHandler = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      errors: { default: 'Não autenticado' }
    });
  }

  const [type, token] = authorization.split(' ');

  if (type !== 'Bearer') {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      errors: { default: 'Não autenticado' }
    });
  }

  const jwtData = verifyToken(token);
  // console.log('ensureAuthent.jwData:', jwtData);
  // console.log(req.headers);

  console.log('req.body EnsureAuth', req.body);
  req.headers.idUsuario = String(jwtData.uid);

  return next();
};

