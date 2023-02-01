import { type Validation } from '@/interfaces/protocols/validation';

export class ValidationSpy implements Validation {
  // @ts-expect-error nesse momento preciso informar o melhor caso para o validation spy
  error: Error = null;
  input: any;

  validate (input: any): Error {
    this.input = input;
    return this.error;
  }
}
