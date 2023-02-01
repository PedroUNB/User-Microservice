import { LoginController } from '@/application/controllers/login-controller';
import { MissingParamError } from '@/application/errors/missing-param-error';
import { faker } from '@faker-js/faker/locale/pt_BR';
import { ValidationSpy } from '@/tests/application/mocks/mock-validation';
import { badRequest } from '@/interfaces/protocols/http';

const mockRequest = (): any => ({
  email: faker.internet.email(),
  password: faker.internet.password()
});

interface SutTypes {
  validationSpy: ValidationSpy
  sut: LoginController
}
const makeSut = (): SutTypes => {
  const validationSpy = new ValidationSpy();
  const sut = new LoginController(validationSpy);
  return {
    validationSpy,
    sut
  };
};

describe('Login Controller', () => {
  test('Should return 400 if Validation return an error', async () => {
    const { sut, validationSpy } = makeSut();
    validationSpy.error = new MissingParamError(faker.random.word());
    const httpResponse = await sut.handle(mockRequest());
    expect(httpResponse).toEqual(badRequest(validationSpy.error));
  });

  test('Should return 200 if valid credentials are provided', async () => {
    const { sut } = makeSut();
    const httpResponse = await sut.handle(mockRequest());
    expect(httpResponse.statusCode).toBe(200);
  });
});
