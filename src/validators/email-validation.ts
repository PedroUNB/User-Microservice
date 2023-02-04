import { InvalidParamError } from '@/application/errors/invalid-param-error';
import { type Validation } from '@/interfaces/protocols/validation';
import { type EmailValidatorAdapter } from '@/infra/validator';

export class EmailValidation implements Validation {
  constructor (
    private readonly fieldName: string,
    private readonly emailValidator: EmailValidatorAdapter
  ) {}

  validate (input: any): Error | undefined {
    const isValid = this.emailValidator.isValid(input[this.fieldName]);
    if (!isValid) {
      return new InvalidParamError(this.fieldName);
    }
  }
}
