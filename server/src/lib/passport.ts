import passport from 'passport';
import { Strategy as GoogleStrategy, type Profile as GoogleProfile } from 'passport-google-oauth20';
import { Strategy as GitHubStrategy, type Profile as GitHubProfile } from 'passport-github2';
import { type VerifyCallback } from 'passport-oauth2';
import { config } from '../config/index.js';
import * as authService from '../services/auth.service.js';

passport.use(
  new GoogleStrategy(
    {
      clientID: config.google.clientId,
      clientSecret: config.google.clientSecret,
      callbackURL: config.google.callbackUrl,
    },
    async (_accessToken: string, _refreshToken: string, profile: GoogleProfile, done: VerifyCallback) => {
      try {
        const email = profile.emails?.[0]?.value;
        if (!email) {
          return done(new Error('No email provided by Google'));
        }
        const result = await authService.handleOAuthUser({
          email,
          name: profile.displayName,
          avatarUrl: profile.photos?.[0]?.value,
          provider: 'google',
        });
        done(null, result);
      } catch (err) {
        done(err as Error);
      }
    }
  )
);

passport.use(
  new GitHubStrategy(
    {
      clientID: config.github.clientId,
      clientSecret: config.github.clientSecret,
      callbackURL: config.github.callbackUrl,
    },
    async (_accessToken: string, _refreshToken: string, profile: GitHubProfile, done: VerifyCallback) => {
      try {
        const email = profile.emails?.[0]?.value || `${profile.username}@github.com`;
        const result = await authService.handleOAuthUser({
          email,
          name: profile.displayName || profile.username || 'GitHub User',
          avatarUrl: profile.photos?.[0]?.value,
          provider: 'github',
        });
        done(null, result);
      } catch (err) {
        done(err as Error);
      }
    }
  )
);

export default passport;
