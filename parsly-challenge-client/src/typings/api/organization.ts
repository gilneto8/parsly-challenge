import { Customer } from './customer';

export type Organization = {
  id: string;
  name: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  structure?: string;
  customerId: Customer['id'];
};
