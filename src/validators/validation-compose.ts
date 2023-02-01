import { type Validation } from '@/interfaces/protocols/validation';

export class ValidationCompose implements Validation {
  constructor (private readonly validations: any[]) {
  }

  validate (input: any): Error | undefined {
    for (const validation of this.validations) {
      const error = validation.validate(input);
      if (error) {
        return error;
      }
    }
  }
}
