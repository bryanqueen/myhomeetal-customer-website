import axios from 'axios';
import Cookie from 'js-cookie';

import { constants } from './constants';

export interface MultiplePostRequestData {
  url: string;
  payload: any;
}

const axiosConfig = {
  headers: {
    'Content-Type': 'application/json',
  },
};

axios.interceptors.request.use(
  (config) => {
    const token = Cookie.get(constants.AUTH_TOKEN);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  async (error) => {
    return await Promise.reject(error);
  }
);

const apiUtils = {
  getRequest: async (url: string) => {
    const res = await axios.get(
      `${constants.V1_BASE_API_URL}${url}`,
      axiosConfig
    );
    return res;
  },
  postRequest: async (url: string, payload: any) => {
    const res = await axios.post(
      `${constants.V1_BASE_API_URL}${url}`,
      payload,
      axiosConfig
    );
    return res;
  },
  putRequest: async (url: string, payload: any) => {
    const res = await axios.put(
      `${constants.V1_BASE_API_URL}${url}`,
      payload,
      axiosConfig
    );
    return res;
  },
  deleteRequest: async (url: string) => {
    const res = await axios.delete(
      `${constants.V1_BASE_API_URL}${url}`,
      axiosConfig
    );
    return res;
  },
  getMultipleRequests: async (urls: string[]) => {
    const requests = urls.map(
      async (url: string) =>
        await axios
          .get(`${constants.V1_BASE_API_URL}${url}`, axiosConfig)
          .catch((error) => error)
    );
    return await axios.all(requests).then(
      axios.spread((...responses) => {
        return responses.map(({ data }) => data);
      })
    );
  },
  postMultipleRequests: async (postData: MultiplePostRequestData[]) => {
    const requests = postData.map(
      async ({ url, payload }) =>
        await axios
          .post(`${constants.V1_BASE_API_URL}${url}`, payload, axiosConfig)
          .catch((error) => error)
    );
    return await axios.all(requests).then(
      axios.spread((...responses) => {
        return responses.map(({ data }) => data);
      })
    );
  },
  getAPIErrorMessage: (error?: string) => {
    if (error) {
      return error;
    } else {
      return 'An error occured. Please try again.';
    }
  },
};

export { apiUtils };
