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

export type GetOrganizationInput = {
  id: Organization['id'];
};

export type DeleteOrganizationInput = {
  id: Organization['id'];
};

export type UpdateOrganizationInput = Partial<
  Pick<Organization, 'name' | 'description' | 'structure'>
>;

export type CreateOrganizationInput = Pick<
  Organization,
  'name' | 'description' | 'structure'
>;
