import jwt from 'jsonwebtoken';

const { JWT_SECRET } = process.env;
export const ACCESS_TOKEN_EXPIRED_IN_SEC = 1 * 60;
export const REFRESH_TOKEN_EXPIRED_IN_SEC = 10 * 60;

export function generateAccessToken(payload: object) {
  const token = jwt.sign(payload, JWT_SECRET as jwt.Secret, {
    expiresIn: ACCESS_TOKEN_EXPIRED_IN_SEC,
  });

  return token;
}

export function generateRefreshToken(payload: object) {
  const token = jwt.sign(payload, JWT_SECRET as jwt.Secret, {
    expiresIn: REFRESH_TOKEN_EXPIRED_IN_SEC,
  });

  return token;
}

export function verifyToken(token: string, options = {}) {
  return jwt.verify(token, JWT_SECRET as jwt.Secret, options);
}
