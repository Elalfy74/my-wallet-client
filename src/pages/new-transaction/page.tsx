import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useState } from 'react';
import { TransactionStepper } from './transaction-stepper';
import { createTransaction } from '@/apis/transactions';

export function NewTransaction() {
  const [active, setActive] = useState(0);
  const nextStep = () => setActive((current) => (current < 3 ? current + 1 : current));

  const { mutate, error, isLoading } = useMutation({
    mutationFn: createTransaction,
    onSuccess: () => nextStep(),
  });

  function handleTransPay(createTrans: CreateTransaction) {
    mutate(createTrans);
  }
  return (
    <TransactionStepper
      active={active}
      setActive={setActive}
      nextStep={nextStep}
      handleTransPay={handleTransPay}
      error={error instanceof AxiosError && error.response?.data.message}
      isLoading={isLoading}
    />
  );
}
