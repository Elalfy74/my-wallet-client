import { instance } from '@/lib/axios';

export function createTransaction(createTransInput: CreateTransaction) {
  return instance.post('/transactions', createTransInput);
}

export function getTransactions(): Promise<{ data: TransactionResponse }> {
  return instance.get('/transactions');
}
