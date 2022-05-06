import passport from 'passport';
import { Strategy } from 'passport-facebook';
import axios from 'axios';
import boom from '@hapi/boom';
import Services from '@server/lib/services/Services';
import { config } from '@server/config';

passport.use(
  new Strategy(
    {
      clientID: config.facebookClientId,
      clientSecret: config.facebookClientSecret,
      callbackURL: '/auth/facebook/callback',
      profilerFields: ['id', 'email', 'displayName']
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const email = profile.email
          ? profile.email
          : `${profile.id}@facebook.com`;

        const { data, status } = await Services.post('auth/signProvider', {
          name: profile.displayName,
          lastName: profile.displayName,
          username: email,
          role: 'public',
          password: profile.id,
          apiKeyToken: config.apiKeyToken
        });

        if (!data || status !== 200) {
          return done(boom.unauthorized(), false);
        }

        return done(null, data);
      } catch (error) {
        return done(true, null);
      }
    }
  )
);
