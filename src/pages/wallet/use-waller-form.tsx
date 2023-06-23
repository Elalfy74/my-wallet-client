import { useMutation, useQueryClient } from '@tanstack/react-query';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { AxiosError } from 'axios';
import { createWallet } from '@/apis/wallets';

const schema = z.object({
  name: z.string().regex(/^[A-Za-z]\w{4,14}$/, 'name must be at least 5 characters'),
});

export const useWalletForm = () => {
  const queryClient = useQueryClient();

  const { mutate, error, isLoading } = useMutation({
    mutationFn: (createWalletInput: CreateWalletInput) => createWallet(createWalletInput),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['wallet'] });
    },
  });

  const { control, handleSubmit } = useForm<CreateWalletInput>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<CreateWalletInput> = async (data) => mutate(data);

  return {
    control,
    onSubmit,
    handleSubmit,
    isLoading,
    error: error instanceof AxiosError && error.response?.data.message,
  };
};
