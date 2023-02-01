import { type Controller } from '@/interfaces/protocols/controller';
import { LoginController } from '@/application/controllers/login-controller';
import { makeLoginValidation } from '@/main/factories/controllers/login-validation-facotry';

export const makeLoginController = (): Controller => {
  return new LoginController(makeLoginValidation());
};
