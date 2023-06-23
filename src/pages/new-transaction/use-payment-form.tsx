import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const schema = z.object({
  amount: z.number().min(5).max(100000),
  note: z.string().nonempty().min(2).optional(),
});

export const usePaymentForm = (handleTrans: (data: CreatePaymentInput) => void) => {
  const { control, handleSubmit } = useForm<CreatePaymentInput>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<CreatePaymentInput> = async (data) => {
    handleTrans(data);
  };

  return {
    control,
    onSubmit,
    handleSubmit,
  };
};
