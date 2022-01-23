import { useMutation } from 'react-query';
import { API_URL } from '../index';
import axios from 'axios';
import {
  DeleteOrganizationInput,
  Organization,
} from '../../typings/api/organization';

const DELETE_ORGANIZATION = 'DELETE_ORGANIZATION';
const func = async (data: DeleteOrganizationInput) => {
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

export function deleteOrganization(id: DeleteOrganizationInput) {
  return useMutation<{}, Error, DeleteOrganizationInput>(
    [DELETE_ORGANIZATION],
    () => func(id),
  );
}
