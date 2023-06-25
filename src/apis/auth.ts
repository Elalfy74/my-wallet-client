import { instance } from '@/lib/axios';

export function login(loginInput: LoginInput): Promise<{ data: CurrentUser }> {
  return instance.post('/auth/login', loginInput);
}

export function register(registerInput: RegisterInput): Promise<{ data: CurrentUser }> {
  return instance.post('/auth/register', registerInput);
}

export function logout() {
  return instance.post('/auth/logout');
}

export function checkAuth() {
  return instance.get('/auth/checkauth');
}
