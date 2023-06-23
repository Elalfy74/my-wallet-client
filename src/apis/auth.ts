import { instance } from '@/lib/axios';

export function login(loginInput: LoginInput): Promise<CurrentUser> {
  return instance.post('/auth/login', loginInput);
}

export function register(registerInput: RegisterInput): Promise<CurrentUser> {
  return instance.post('/auth/register', registerInput);
}
