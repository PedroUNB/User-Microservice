import { type Router } from 'express';
import { adaptRoute } from '@/main/adapters/express-router-adapter';
import { makeLoginController } from '@/main/factories/controllers/login-controller-facotry';

export default (router: Router): void => {
  router.post('/login', adaptRoute(makeLoginController()));
};
