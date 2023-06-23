import { instance } from '@/lib/axios';

export function login(loginInput: LoginInput) {
  return instance.post('/auth/login', loginInput);
}
