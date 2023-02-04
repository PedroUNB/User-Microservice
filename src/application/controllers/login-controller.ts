import { type Controller } from '@/interfaces/protocols/controller';
import { badRequest, type HttpResponse, ok } from '@/interfaces/protocols/http';
import { type Validation } from '@/interfaces/protocols/validation';

export class LoginController implements Controller {
  constructor (
    private readonly validation: Validation
  ) {}

  async handle (request: any): Promise<HttpResponse> {
    const error = this.validation.validate(request);
    if (error) {
      return badRequest(error);
    }
    return ok(request);
  }
}
