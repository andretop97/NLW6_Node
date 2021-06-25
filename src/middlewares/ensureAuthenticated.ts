import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

interface IPayLoad {
  sub: string;
}

export function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  const authToken = request.headers.authorization;

  if (!authToken) {
    return response.status(401).end();
  }

  const [, token] = authToken.split(' ');
  try {
    const { sub } = verify(
      token,
      '177a3cb915313f883c0a5fad0e12d5fe',
    ) as IPayLoad;

    request.user_id = sub;
    return next();
  } catch (err) {
    return response.status(401).end();
  }
}
