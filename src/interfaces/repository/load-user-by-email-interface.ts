import { type IUser } from '@/interfaces/data/user-interface';

export interface loadUserByEmailRepository {
  loadByEmail: (email: string) => Promise<IUser>
}
