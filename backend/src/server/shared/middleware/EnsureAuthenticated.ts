import { RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';


export const ensureAuthenticated: RequestHandler = async (req, res, next) => {
  const { authorization } = req.headers;

  if(!authorization){
    return res.status(StatusCodes.UNAUTHORIZED).json({
      errors: {default: 'Not authenticated'}
    });
  }

  console.log(req.headers);

  const [type, token] = authorization.split(' ');

  if(type !== 'Bearer'){
    return res.status(StatusCodes.UNAUTHORIZED).json({
      errors: {default: 'Not authenticated'}
    });
  }

  if(token !== 'teste.teste.teste'){
    return res.status(StatusCodes.UNAUTHORIZED).json({
      errors: {default: 'Not authenticated'}
    });
  }

  return next();
};