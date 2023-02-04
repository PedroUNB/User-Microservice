
import validator from 'validator';
import { type IEmailValidator } from '@/interfaces/protocols/email-validator-interface';

export class EmailValidatorAdapter implements IEmailValidator {
  isValid (email: string): boolean {
    return validator.isEmail(email);
  }
}
