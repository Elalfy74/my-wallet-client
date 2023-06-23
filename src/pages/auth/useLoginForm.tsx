import { useMutation } from '@tanstack/react-query';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { login } from '@/apis/auth';

const schema = z.object({
  email: z.string().email('Email is invalid').nonempty('Email is required'),
  password: z.string().min(6),
});

export const useLoginForm = () => {
  const mutation = useMutation({
    mutationFn: (loginInput: LoginInput) => login(loginInput),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Inputs>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<Inputs> = async (data) => mutation.mutate(data);

  return {
    register,
    onSubmit,
    handleSubmit,
  };
};

export type Inputs = {
  email: string;
  password: string;
};
