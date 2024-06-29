import { AxiosError, AxiosResponse } from 'axios';
import { useQuery } from 'react-query';

import productService from '@services/productService';
import { queryKeys } from '@utils/constants';

export const useGetAllProducts = (paramsString?: string) => {
  const { data, error, isLoading, refetch } = useQuery<
    AxiosResponse<any>,
    AxiosError<any>
  >([queryKeys.ALL_PRODUCTS, paramsString], () =>
    productService.getAllProducts(paramsString || '')
  );

  return {
    products: data?.data,
    count: data?.data.count,
    pages: data?.data.pages,
    loading: isLoading,
    refetch: async () => {
      await refetch();
    },
    error,
  };
};
