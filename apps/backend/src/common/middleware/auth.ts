import { verifyJwt } from '@common/utils/jwt.util';
import { NextFunction, Request, Response } from 'express';
import { Schema } from 'mongoose';
export const deserializeUser = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies['attendance'];
  if (!token) {
    return res.status(401).send('Authentication required to access this resource.');
  }
  const { decodedValue, expired } = verifyJwt(token);
  if (expired) {
    return res.status(403).send('Token expired! Login again!');
  }
  if (decodedValue) {
    console.log(decodedValue);
    req.user._id = decodedValue as Schema.Types.UUID;
    return next();
  }
  return res.status(403).send('Token Invalid');
};
