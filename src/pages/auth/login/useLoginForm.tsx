import { useMutation } from '@tanstack/react-query';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { AxiosError } from 'axios';
import { login as loginUser } from '@/apis/auth';
import { useAuth } from '@/store/auth';

const schema = z.object({
  email: z.string().email('Email is invalid').nonempty('Email is required'),
  password: z.string().min(6).max(225),
});

export const useLoginForm = () => {
  const login = useAuth((state) => state.loginUser);

  const { mutate, error, isLoading } = useMutation({
    mutationFn: (loginInput: LoginInput) => loginUser(loginInput),
    onSuccess: (user) => login(user),
  });

  const { control, handleSubmit } = useForm<LoginInput>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<LoginInput> = async (data) => mutate(data);

  return {
    control,
    onSubmit,
    handleSubmit,
    isLoading,
    error: error instanceof AxiosError && error.response?.data.message,
  };
};
