import qs from 'qs';
import { ConfigureAxios } from './ConfigureAxios';

const axiosConfig = new ConfigureAxios({
  configure: {
    method: 'GET',
    baseURL: process.env.MAIN_SERVICE_BASE_URL,
    timeout: 30000,
    paramsSerializer: qs.stringify,
  },
});

export const fetchAPI = axiosConfig.create();
