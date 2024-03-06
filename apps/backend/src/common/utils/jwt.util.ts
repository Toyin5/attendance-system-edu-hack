import 'dotenv/config';
import jwt from 'jsonwebtoken';

export const signJwt = (object: object) =>
  jwt.sign(object, process.env.PRIVATE_KEY as string, {
    expiresIn: '24hr',
    algorithm: 'RS256',
  });

export const verifyJwt = (token: string) => {
  try {
    const decodedValue = <jwt.JwtPayload>jwt.verify(token, process.env.PUBLIC_KEY as string);
    console.log(decodedValue);
    return {
      expired: false,
      decodedValue: decodedValue,
    };
  } catch (err) {
    return {
      expired: (err as { name: string }).name === 'TokenExpiredError',
      decodedValue: null,
    };
  }
};
