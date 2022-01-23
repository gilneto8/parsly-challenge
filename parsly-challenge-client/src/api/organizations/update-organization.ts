import { useQuery } from 'react-query';
import { API_URL } from '../index';
import axios from 'axios';
import {
  UpdateOrganizationInput,
  Organization,
} from '../../typings/api/organization';

const UPDATE_ORGANIZATION = 'UPDATE_ORGANIZATION';
const func = async (id: Organization['id'], data: UpdateOrganizationInput) => {
  const endpoint = API_URL + `/organization/${id}`;
  return axios
    .patch<unknown, { data: Organization }>(endpoint, { organization: data }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
    .then((response) => {
      return response.data;
    });
};

export function updateOrganization(
  id: Organization['id'],
  data: UpdateOrganizationInput,
) {
  return useQuery<Organization, Error, UpdateOrganizationInput>(
    [UPDATE_ORGANIZATION],
    () => func(id, data),
  );
}
