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
