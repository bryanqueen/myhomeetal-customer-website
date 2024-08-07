import axios, { AxiosResponse } from 'axios';
import { constants } from './constants'; // Import your constants file
import Cookie from 'js-cookie';

interface CacheEntry {
  data: AxiosResponse;
  timestamp: number;
}

const cache = new Map<string, CacheEntry>(); // In-memory cache

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

const CACHE_DURATION = 86400 * 1000; // Cache duration in milliseconds (default: 1 day)

const apiUtils = {
  getRequestWithCache: async (url: string, cacheDuration = CACHE_DURATION): Promise<AxiosResponse> => {
    const cacheKey = `${constants.V1_BASE_API_URL}${url}`;
    const cachedResponse = cache.get(cacheKey);

    if (cachedResponse && (Date.now() - cachedResponse.timestamp) < cacheDuration) {
      return cachedResponse.data;
    }

    const res = await axios.get(cacheKey, axiosConfig);
    cache.set(cacheKey, { data: res, timestamp: Date.now() });
    return res;
  },
  getRequest: async (url: string): Promise<AxiosResponse> => {
    return await axios.get(`${constants.V1_BASE_API_URL}${url}`, axiosConfig);
  },
  postRequest: async (url: string, payload?: any): Promise<AxiosResponse> => {
    return await axios.post(`${constants.V1_BASE_API_URL}${url}`, payload, axiosConfig);
  },
  putRequest: async (url: string, payload: any): Promise<AxiosResponse> => {
    return await axios.put(`${constants.V1_BASE_API_URL}${url}`, payload, axiosConfig);
  },
  deleteRequest: async (url: string, payload?: any): Promise<AxiosResponse> => {
    const axiosConfigWithData = {
      ...axiosConfig,
      data: payload,
    };
    return await axios.delete(`${constants.V1_BASE_API_URL}${url}`, axiosConfigWithData);
  },
  getMultipleRequests: async (urls: string[]): Promise<any[]> => {
    const requests = urls.map((url: string) => axios.get(`${constants.V1_BASE_API_URL}${url}`, axiosConfig).catch((error) => error));
    return await axios.all(requests).then(axios.spread((...responses) => responses.map(({ data }) => data)));
  },
  postMultipleRequests: async (postData: { url: string; payload: any }[]): Promise<any[]> => {
    const requests = postData.map(({ url, payload }) => axios.post(`${constants.V1_BASE_API_URL}${url}`, payload, axiosConfig).catch((error) => error));
    return await axios.all(requests).then(axios.spread((...responses) => responses.map(({ data }) => data)));
  },
  getAPIErrorMessage: (error?: string): string => {
    return error ? error : 'An error occurred. Please try again.';
  },
};

export { apiUtils };
