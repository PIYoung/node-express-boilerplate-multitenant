import { Strategy as JwtStrategy, ExtractJwt, StrategyOptions, VerifyCallback } from 'passport-jwt';

import { User } from '../models/main/user.model';

const strategyOptions: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env['JWT_SECRET'] || 'jwt-secret',
  ignoreExpiration: false,
};

const verify: VerifyCallback = async (payload, done) => {
  try {
    const user = await User.readOne(payload.id);

    if (!user) return done(null, false);

    return done(null, user);
  } catch (error) {
    done(error, false);
  }
};

export const jwtStrategy = new JwtStrategy(strategyOptions, verify);
