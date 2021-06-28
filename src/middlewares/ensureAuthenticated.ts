import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

interface IPayload {
  sub: string;
}

export function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  // Receber o token
  const authtoken = request.headers.authorization;

  // Validar o token
  if (!authtoken) {
    return response.status(401).end();
  }

  const [, token] = authtoken.split(' ');

  try {
    // Checar se o token está válido
    const { sub } = verify(
      token,
      '63560e5232d03070bac988e1ffb43872'
    ) as IPayload;

    // Recuperar informações do usuário
    request.user_id = sub;
  } catch (error) {
    return response.status(401).end();
  }

  return next();
}
