import 'dotenv/config';
import * as jwt from 'jsonwebtoken';
// import { sign, verify, SignOptions, JwtPayload } from 'jsonwebtoken';

const JWT_OPTIONS: jwt.SignOptions = { expiresIn: 86400 };

const JWT_SECRET = process.env.JWT_SECRET as string;

interface IPayload extends jwt.JwtPayload {
  username: string;
  id: number;
}

export const createToken = (payload: IPayload ): string => {
  return jwt.sign(payload, JWT_SECRET);
};
export const verifyToken = (token: string): IPayload => {
  return jwt.verify(token, JWT_SECRET) as IPayload;
};