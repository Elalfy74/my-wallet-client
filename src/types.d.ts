type CurrentUser = {
  firstName: string;
  lastName: string;
};

type LoginInput = {
  email: string;
  password: string;
};

type RegisterInput = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  nationalId: number;
  phone: number;
};

type CreateWalletInput = {
  name: string;
};

type Wallet = {
  name: string;
  balance: number;
};

type QueryWallets = {
  search: string;
};

type FoundContact = {
  name: string;
  user: {
    firstName: string;
    lastName: string;
    avatar: sting;
  };
};

type CreatePaymentInput = {
  amount: number;
  note?: string;
};

type Transaction = CreatePaymentInput & {
  receiver: string;
};
