import axios from 'axios';

const API_URL = 'https://dev.to/api';

export const api = () => {
  return axios.create({
    baseURL: API_URL,
  });
};
