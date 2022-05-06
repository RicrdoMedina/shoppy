import Services from '@server/lib/services/Services';
import passport from 'passport';
import { BasicStrategy } from 'passport-http';
import boom from '@hapi/boom';

passport.use(
  new BasicStrategy(
    async (username: string, password: string, cb: Function) => {
      try {
        const res = await Services.auth('auth/signIn', username, password);

        const { data, status } = res;

        if (!data || status !== 200) {
          return cb(boom.unauthorized(), false);
        }

        return cb(null, data);
      } catch (error) {
        return cb(error, null);
      }
    }
  )
);
