import { Customer } from './customer';

export type Organization = {
  _id: string;
  name: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  structure?: string;
  customerId: Customer['_id'];
};

export type GetOrganizationInput = {
  id: Organization['_id'];
};

export type DeleteOrganizationInput = {
  id: Organization['_id'];
};

export type UpdateOrganizationInput = Partial<
  Pick<Organization, 'name' | 'description' | 'structure'>
>;

export type CreateOrganizationInput = Pick<
  Organization,
  'name' | 'description'
>;
