import passport from 'passport';
import { OAuth2Strategy } from 'passport-google-oauth';
import axios from 'axios';
import boom from '@hapi/boom';
import Services from '@server/lib/services/Services';
import { config } from '@server/config';

passport.use(
  new OAuth2Strategy(
    {
      clientID: config.googleClientId,
      clientSecret: config.googleClientSecret,
      callbackURL: '/auth/google/callback'
    },
    async (accessToken, refreshToken, { _json: profile }, done) => {
      try {
        const { data, status } = await Services.post('auth/signProvider', {
          name: profile.name,
          lastName: profile.name,
          username: profile.email,
          password: profile.sub,
          role: 'public',
          apiKeyToken: config.apiKeyToken
        });

        if (!data || status !== 200) {
          done(boom.unauthorized(), false);
        }

        done(null, data);
      } catch (err) {
        done(true, null);
      }
    }
  )
);
