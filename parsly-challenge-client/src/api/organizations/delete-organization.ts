import { useMutation } from 'react-query';
import { API_URL } from '../index';
import axios from 'axios';
import { DeleteOrganizationInput } from '../../typings/api/organization';

const DELETE_ORGANIZATION = 'DELETE_ORGANIZATION';
const func = async (data: DeleteOrganizationInput) => {
  console.log('data', data)
  const endpoint = API_URL + `/organization/${data.id}`;
  return axios
    .delete<unknown, { data: {} }>(endpoint, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
    .then((response) => {
      return response.data;
    });
};

export function deleteOrganization(data: DeleteOrganizationInput) {
  return useMutation<{}, Error, DeleteOrganizationInput>(
    [DELETE_ORGANIZATION],
    () => func(data),
  );
}
