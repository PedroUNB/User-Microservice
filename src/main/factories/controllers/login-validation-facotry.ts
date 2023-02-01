import { RequiredFieldValidation } from '@/validators/required-field-validation';
import { ValidationCompose } from '@/validators/validation-compose';

export const makeLoginValidation = (): any => {
  const validations = [];

  for (const field of ['email', 'password']) {
    validations.push(new RequiredFieldValidation(field));
  }
  return new ValidationCompose(validations);
};
