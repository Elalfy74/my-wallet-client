import { useMutation, useQuery } from '@tanstack/react-query';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNavigate, useParams } from 'react-router-dom';
import { AxiosError } from 'axios';

import { checkResetLink, resetPassword } from '@/apis/auth';

const schema = z
  .object({
    password: z.string().min(6).max(225),
    confirmPassword: z.string().min(6).max(225),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

type Params = {
  userId: string;
  token: string;
};

export const useResetPasswordForm = () => {
  const { userId, token } = useParams<Params>();
  const navigate = useNavigate();

  const { error: checkError, isLoading: checkLoading } = useQuery({
    queryFn: () => checkResetLink(userId!, token!),
    queryKey: ['checkResetLink'],
  });

  if (checkError) {
    navigate('/');
  }

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
    checkLoading,
  };
};
