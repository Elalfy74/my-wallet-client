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

export function forgotPassword(forgotPasswordInput: ForgotPasswordInput) {
  return instance.post('/auth/forgot-password', forgotPasswordInput);
}

export function checkResetLink(userId: string, token: string) {
  return instance.get(`/auth/reset-password/${userId}/${token}`);
}

export function resetPassword(
  userId: string,
  token: string,
  resetPasswordInput: ResetPasswordInput
) {
  return instance.post(`/auth/reset-password/${userId}/${token}`, resetPasswordInput);
}
