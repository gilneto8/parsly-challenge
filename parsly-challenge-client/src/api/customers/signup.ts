import { LoginResponse, SignupInput } from '../../typings/api/auth';
import { useMutation } from 'react-query';
import { API_URL } from '../index';
import axios from 'axios';

const SIGNUP = 'SIGNUP';
const func = async (data: SignupInput) => {
  const endpoint = API_URL + '/register';
  return axios
    .post<unknown, { data: LoginResponse }>(endpoint, data)
    .then((response) => {
      return response.data;
    });
};

export function signup(data: SignupInput) {
  return useMutation<LoginResponse, Error, SignupInput>([SIGNUP], () =>
    func(data),
  );
}
