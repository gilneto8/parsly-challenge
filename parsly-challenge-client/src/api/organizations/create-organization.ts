import { useQuery } from 'react-query';
import { API_URL } from '../index';
import axios from 'axios';
import {
  CreateOrganizationInput,
  Organization,
} from '../../typings/api/organization';

const CREATE_ORGANIZATION = 'CREATE_ORGANIZATION';
const func = async (data: CreateOrganizationInput) => {
  const endpoint = API_URL + `/organization`;
  return axios
    .patch<unknown, { data: Organization }>(
      endpoint,
      { organization: data },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      },
    )
    .then((response) => {
      return response.data;
    });
};

export function createOrganization(data: CreateOrganizationInput) {
  return useQuery<Organization, Error, CreateOrganizationInput>(
    [CREATE_ORGANIZATION],
    () => func(data),
  );
}
