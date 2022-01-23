import { useQuery } from 'react-query';
import { API_URL } from '../index';
import axios from 'axios';
import { Organization } from '../../typings/api/organization';

const GET_ORGANIZATIONS = 'GET_ORGANIZATIONS';
const func = async () => {
  const endpoint = API_URL + '/organization';
  return axios
    .get<unknown, { data: Organization[] }>(endpoint, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
    .then((response) => {
      return response.data;
    });
};

export function getOrganizations() {
  return useQuery<Organization[], Error>([GET_ORGANIZATIONS], func);
}
