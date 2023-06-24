import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { createTransaction } from '@/apis/transactions';
import { getWallet } from '@/apis/wallets';

import { TransactionStepper } from './components/transaction-stepper';

export function NewTransaction() {
  const navigate = useNavigate();

  // Control The Stepper
  const [active, setActive] = useState(0);
  const nextStep = () => setActive((current) => (current < 3 ? current + 1 : current));

  // Get old transactions
  const { mutate, error, isLoading } = useMutation({
    mutationFn: createTransaction,
    onSuccess: () => nextStep(),
  });

  // Check if the use has a wallet
  useEffect(() => {
    getWallet().catch(() =>
      navigate('/wallet', {
        replace: true,
      })
    );
  }, []);

  // Make the Trans
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
