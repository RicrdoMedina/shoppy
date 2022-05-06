import passport from 'passport';
import { Strategy } from 'passport-twitter';
import axios from 'axios';
import boom from '@hapi/boom';
import Services from '@server/lib/services/Services';
import { config } from '@server/config';
import { get } from 'lodash';

passport.use(
  new Strategy(
    {
      consumerKey: config.twitterComsumerKey,
      consumerSecret: config.twitterComsumerSecret,
      callbackURL: '/auth/twitter/callback',
      includeEmail: true
    },
    async (token, tokenSecret, profile, cb) => {
      try {
        const { data, status } = await Services.post('auth/signProvider', {
          name: profile.displayName,
          lastName: profile.displayName,
          username: get(
            profile,
            'emails.0.value',
            `${profile.username}@twitter.com`
          ),
          role: 'public',
          password: profile.id,
          apiKeyToken: config.apiKeyToken
        });

        if (!data || status !== 200) {
          return cb(boom.unauthorized(), false);
        }

        return cb(null, data);
      } catch (error) {
        cb(true, null);
      }
    }
  )
);
