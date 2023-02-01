import { type Validation } from '@/interfaces/protocols/validation';
import { MissingParamError } from '@/application/errors/missing-param-error';

export class RequiredFieldValidation implements Validation {
  constructor (private readonly fieldName: string) {}

  validate (input: any): Error | undefined {
    if (!input[this.fieldName]) {
      return new MissingParamError(this.fieldName);
    }
  }
}
