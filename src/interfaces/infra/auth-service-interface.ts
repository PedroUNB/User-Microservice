export interface IAuthService {
  generateToken: (payload) => Promise<string>
}
