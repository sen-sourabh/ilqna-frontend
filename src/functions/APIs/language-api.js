import axios from 'axios';
import ENV from '../../config.json';
import { refactor } from '../common/common';

export const prepareHeaders = () => {
  let token = !localStorage.getItem('userData')
    ? ''
    : JSON.parse(localStorage.getItem('userData')).token;
  return {
    headers: {
      authorization: 'Bearer ' + token,
    },
  };
};

export const getLanguages = async (body) => {
  return await axios
    .get(ENV.API_URL + 'languages/getAllLanguages')
    .then((response) => {
      return refactor(response);
    })
    .catch((error) => {
      return { code: 101, status: 'F_ERROR', message: error };
    });
};
