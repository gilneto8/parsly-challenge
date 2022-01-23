import { useQuery } from 'react-query';
import { API_URL } from '../index';
import axios from 'axios';
import { GetOrganizationInput, Organization } from '../../typings/api/organization';

const GET_ORGANIZATION = 'GET_ORGANIZATION';
const func = async (data: GetOrganizationInput) => {
  const endpoint = API_URL + `/organization/${data.id}`;
  return axios
    .get<unknown, { data: Organization }>(endpoint, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
    .then((response) => {
      return response.data;
    });
};

export function getOrganization(data: GetOrganizationInput) {
  return useQuery<Organization, Error, GetOrganizationInput>([GET_ORGANIZATION], () => func(data));
}
