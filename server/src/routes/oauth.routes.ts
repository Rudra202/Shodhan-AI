import { Router } from 'express';
import passport from '../lib/passport.js';
import { config } from '../config/index.js';

const router = Router();

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'], session: false }));

router.get(
  '/google/callback',
  passport.authenticate('google', { session: false, failureRedirect: `${config.frontendUrl}/login` }),
  (req, res) => {
    const data = req.user as unknown as { accessToken: string; refreshToken: string; user: Record<string, unknown> };
    const { accessToken, refreshToken, user } = data;
    const encoded = Buffer.from(
      JSON.stringify({ accessToken, refreshToken, user })
    ).toString('base64');
    res.redirect(`${config.frontendUrl}/oauth-callback?data=${encoded}`);
  }
);

router.get('/github', passport.authenticate('github', { scope: ['user:email'], session: false }));

router.get(
  '/github/callback',
  passport.authenticate('github', { session: false, failureRedirect: `${config.frontendUrl}/login` }),
  (req, res) => {
    const data = req.user as unknown as { accessToken: string; refreshToken: string; user: Record<string, unknown> };
    const { accessToken, refreshToken, user } = data;
    const encoded = Buffer.from(
      JSON.stringify({ accessToken, refreshToken, user })
    ).toString('base64');
    res.redirect(`${config.frontendUrl}/oauth-callback?data=${encoded}`);
  }
);

export default router;
