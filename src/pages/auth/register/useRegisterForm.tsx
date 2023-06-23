import { useMutation } from '@tanstack/react-query';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { register as registerUser } from '@/apis/auth';
import { useAuth } from '@/store/auth';

const schema = z.object({
  firstName: z.string().min(2).max(50),
  lastName: z.string().min(2).max(50),

  email: z.string().email('Email is invalid').nonempty('Email is required'),
  password: z.string().min(6).max(225),

  nationalId: z
    .number()
    .refine((numb) => numb.toString().length === 14, 'National ID exactly 14 number long'),
  phone: z
    .number()
    .refine((numb) => numb.toString().length === 10, 'Phone Number exactly 10 number long'),
});

export const useRegisterForm = () => {
  const login = useAuth((state) => state.login);

  const mutation = useMutation({
    mutationFn: (registerInput: RegisterInput) => registerUser(registerInput),
    onSuccess: (user) => login(user),
  });

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm<RegisterInput>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<RegisterInput> = async (data) => mutation.mutate(data);

  return {
    control,
    onSubmit,
    handleSubmit,
    setValue,
    errors,
  };
};
