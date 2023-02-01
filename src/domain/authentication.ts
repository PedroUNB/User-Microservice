import { type loadUserByEmailRepository } from '@/interfaces/repository/load-user-by-email-interface';
import { type HashComparer } from '@/interfaces/protocols/hash-comparer-interface';
import { type IAuthentication } from '@/interfaces/usecases/authentication-interface';
import { type IAuthService } from '@/interfaces/infra/auth-service-interface';

export class Authentication implements IAuthentication {
  constructor (
    private readonly userRepository: loadUserByEmailRepository,
    private readonly hashComparer: HashComparer,
    private readonly authService: IAuthService
  ) {
  }

  async auth (authParams: IAuthentication.Params): Promise<any> {
    const user = await this.userRepository.loadByEmail(authParams.email);
    if (user) {
      const [password, ...payload] = user;
      const isValid = await this.hashComparer.compare(authParams.password, password);
      if (isValid) {
        const accessToken = await this.authService.generateToken(payload);
        return {
          accessToken,
          id: user.id
        };
      }
    }
    return null;
  }
}
