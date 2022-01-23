import { LoginInput, LoginResponse } from '../../typings/api/auth';
import { useMutation } from 'react-query';
import { API_URL } from '../index';
import axios from 'axios';

const LOGIN = 'LOGIN';
const func = async (data: LoginInput) => {
  const endpoint = API_URL + '/login';
  return axios
    .post<unknown, { data: LoginResponse }>(endpoint, data)
    .then((response) => {
      return response.data;
    });
};

export function login(data: LoginInput) {
  return useMutation<LoginResponse, Error, LoginInput>([LOGIN], () =>
    func(data),
  );
}
