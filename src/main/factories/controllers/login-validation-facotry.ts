import { RequiredFieldValidation } from '@/validators/required-field-validation';
import { ValidationCompose } from '@/validators/validation-compose';
import { EmailValidatorAdapter } from '@/infra/validator';
import { EmailValidation } from '@/validators/email-validation';

export const makeLoginValidation = (): any => {
  const validations = [];

  for (const field of ['email', 'password']) {
    validations.push(new RequiredFieldValidation(field));
  }
  validations.push(new EmailValidation('email', new EmailValidatorAdapter()));
  return new ValidationCompose(validations);
};
