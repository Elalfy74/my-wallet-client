import { useMutation } from '@tanstack/react-query';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNavigate, useParams } from 'react-router-dom';
import { AxiosError } from 'axios';
import { useEffect } from 'react';

import { checkResetLink, resetPassword } from '@/apis/auth';

const schema = z.object({
  password: z.string().min(6).max(225),
  confirmPassword: z.string().min(6).max(225),
});

type Params = {
  userId: string;
  token: string;
};

export const useResetPasswordForm = () => {
  const { userId, token } = useParams<Params>();
  const navigate = useNavigate();

  useEffect(() => {
    checkResetLink(userId!, token!).catch(() => navigate('/'));
  }, []);

  const { control, handleSubmit } = useForm<ResetPasswordInput>({
    resolver: zodResolver(schema),
  });

  const {
    mutate,
    error,
    isLoading,
    data: resData,
  } = useMutation({
    mutationFn: (data: ResetPasswordInput) => resetPassword(userId!, token!, data),
    onSuccess: () => setTimeout(() => navigate('/'), 2000),
  });

  const onSubmit: SubmitHandler<ResetPasswordInput> = async (data) => {
    mutate(data);
  };

  return {
    control,
    onSubmit,
    handleSubmit,
    isLoading,
    message: resData?.data.message,
    error: error instanceof AxiosError && error.response?.data.message,
  };
};
