import { Authentication } from '@/domain/authentication';
import { type IAuthentication } from '@/interfaces/usecases/authentication-interface';

export const makeAuthentication = (): IAuthentication => {
  const salt = 12;
  const bcryptAdapter = '';
  return new Authentication(userRepository, bcryptAdapter);
};
