import { useMutation } from '@tanstack/react-query';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { AxiosError } from 'axios';

import { login } from '@/apis/auth';
import { useAuth } from '@/store/auth';

const schema = z.object({
  email: z.string().email('Email is invalid').nonempty('Email is required'),
  password: z.string().min(6).max(225),
  remember: z.boolean().default(false),
});

export const useLoginForm = () => {
  const loginUser = useAuth((state) => state.loginUser);

  const { control, handleSubmit } = useForm<LoginInput>({
    resolver: zodResolver(schema),
  });

  const { mutate, error, isLoading } = useMutation({
    mutationFn: login,
    onSuccess: (user) => loginUser(user.data, !!control._formValues.remember),
  });

  const onSubmit: SubmitHandler<LoginInput> = async (data) => {
    mutate(data);
  };

  return {
    control,
    onSubmit,
    handleSubmit,
    isLoading,
    error: error instanceof AxiosError && error.response?.data.message,
  };
};
