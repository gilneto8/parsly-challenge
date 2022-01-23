import { Customer } from './customer';

export type Token = {
  token: string;
};

export type LoginInput = {
  email: string;
  password: string;
};

export type SignupInput = {
  email: string;
  first_name: string;
  last_name: string;
  password: string;
};

export type LoginResponse = Token & {
  customer: Customer;
};
