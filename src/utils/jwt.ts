import jwt from 'jsonwebtoken';

export const ACCESS_TOKEN_EXPIRED_IN_SEC = 1 * 60;
export const REFRESH_TOKEN_EXPIRED_IN_SEC = 10 * 60;

export function generateAccessToken(payload: object) {
  const { JWT_SECRET } = process.env;
  const token = jwt.sign(payload, JWT_SECRET as jwt.Secret, {
    expiresIn: ACCESS_TOKEN_EXPIRED_IN_SEC,
  });

  return token;
}

export function generateRefreshToken(payload: object) {
  const { JWT_SECRET } = process.env;
  const token = jwt.sign(payload, JWT_SECRET as jwt.Secret, {
    expiresIn: REFRESH_TOKEN_EXPIRED_IN_SEC,
  });

  return token;
}

export function verifyToken(token: string, options = {}) {
  const { JWT_SECRET } = process.env;
  return jwt.verify(token, JWT_SECRET as jwt.Secret, options);
}
