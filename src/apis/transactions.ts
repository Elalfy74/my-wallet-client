import { instance } from '@/lib/axios';

export function createTransaction(createTransInput: CreateTransaction) {
  return instance.post('/transactions', createTransInput);
}

export function getTransactions(): Promise<{ data: TransactionRes }> {
  return instance.get('/transactions');
}
