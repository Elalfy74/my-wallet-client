import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TransactionStepper } from './transaction-stepper';
import { createTransaction } from '@/apis/transactions';
import { getWallet } from '@/apis/wallets';

export function NewTransaction() {
  const [active, setActive] = useState(0);
  const nextStep = () => setActive((current) => (current < 3 ? current + 1 : current));
  const navigate = useNavigate();

  const { mutate, error, isLoading } = useMutation({
    mutationFn: createTransaction,
    onSuccess: () => nextStep(),
  });

  useEffect(() => {
    getWallet().catch(() =>
      navigate('/wallet', {
        replace: true,
      })
    );
  }, []);

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
