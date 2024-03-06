import { verifyJwt } from '@common/utils/jwt.util';
import { logger } from '@src/server';
import { NextFunction, Request, Response } from 'express';
export const deserializeUser = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies['attendance'];
  if (!token) {
    logger.error('No token provided');
    return res.status(401).send('Authentication required to access this resource.');
  }
  try {
    const { decodedValue, expired } = verifyJwt(token);
    if (expired) {
      return res.status(403).send('Token expired! Login again!');
    }
    if (decodedValue) {
      console.log(decodedValue.id);
      req.user = decodedValue.id;
      return next();
    }
    return res.status(403).send('Token Invalid');
  } catch (error) {
    logger.error(error);
    return res.status(403).send('An error occurred while validating the token');
  }
};
