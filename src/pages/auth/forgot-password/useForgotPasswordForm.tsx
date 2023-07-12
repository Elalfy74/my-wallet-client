import { useMutation } from '@tanstack/react-query';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { AxiosError } from 'axios';

import { forgotPassword } from '@/apis/auth';

const schema = z.object({
  email: z.string().email('Email is invalid').nonempty('Email is required'),
});

export const useForgotPasswordForm = () => {
  const { control, handleSubmit, resetField } = useForm<ForgotPasswordInput>({
    resolver: zodResolver(schema),
  });

  const {
    mutate,
    error,
    isLoading,
    data: resData,
  } = useMutation({
    mutationFn: forgotPassword,
    onSuccess: () =>
      resetField('email', {
        defaultValue: '',
      }),
  });

  const onSubmit: SubmitHandler<ForgotPasswordInput> = async (data) => {
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
