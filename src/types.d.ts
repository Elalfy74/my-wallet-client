type CurrentUser = {
  accessToken: string;
  user: {
    firstName: string;
    lastName: string;
    avatar: string;
  };
};

// Auth
type LoginInput = {
  email: string;
  password: string;
  remember: boolean;
};

type RegisterInput = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  nationalId: number;
  phone: number;
};

type ForgotPasswordInput = {
  email: string;
};

type ResetPasswordInput = {
  password: string;
  confirmPassword: string;
};

// Wallet
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

type CreateTransaction = CreatePaymentInput & {
  receiverName: string;
};

// Transaction
type Transaction = {
  id: string;
  amount: number;
  senderName?: string;
  receiverName?: string;
  note?: string;
  createdAt: Date;
};

type TransactionResponse = {
  name: string;
  receivedTransactions: Transaction[];
  sentTransactions: Transaction[];
};
