import { useMutation } from '@tanstack/react-query';
import { TransactionStepper } from './transaction-stepper';
import { createTransaction } from '@/apis/transactions';

export function NewTransaction() {
  const { mutate } = useMutation({
    mutationFn: createTransaction,
  });

  function handleTransPay(createTrans: CreateTransaction) {
    mutate(createTrans);
  }
  return <TransactionStepper handleTransPay={handleTransPay} />;
}
