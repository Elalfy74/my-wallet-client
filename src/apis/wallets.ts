import { instance } from '@/lib/axios';

export function createWallet(createWalletInput: CreateWalletInput) {
  return instance.post('/wallets', createWalletInput);
}

export function getWallet(): Promise<{ data: Wallet }> {
  return instance.get('/wallets/one');
}

export function getWalletsByQuery(query: QueryWallets): Promise<{ data: FoundContact[] }> {
  return instance.get('/wallets', {
    params: query,
  });
}
