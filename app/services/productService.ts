import { api } from '@utils/api';
import { apiUtils } from '@/app/utils/apiUtils';

const productService = {
  getAllProducts: async (params?: string) => {
    return await apiUtils.getRequest(`${api.PRODUCTS}?${params}`);
  },
  getUserDetails: async (id?: string) => {
    return await apiUtils.getRequest(`${api.GET_USER}${id}`);
  },
  saveProduct: async ({ payload, id }: { payload: any; id: string }) => {
    return await apiUtils.postRequest(
      `user/save-item/${id}`,
      payload
    );
  },
  getSavedProducts: async (id?: string) => {
    return await apiUtils.getRequest(`user/saved-items`);
  },
  removeSavedProduct: async (id?: string) => {
    return await apiUtils.deleteRequest(`${api.GET_USER}saved-item`);
  },
  getProductsByCategory: async (id?: string) => {
    return await apiUtils.getRequest(`${api.PRODUCTS}/category/${id}`);
  },
  getProductCategories: async () => {
    return await apiUtils.getRequest(`${api.PRODUCT_CATEGORIES}`);
  },
  getTopProductCategories: async () => {
    return await apiUtils.getRequest(`${api.TOP_PRODUCT_CATEGORIES}`);
  },
  getProductDetail: async (id: string) => {
    return await apiUtils.getRequest(`${api.PRODUCTS}${id}`);
  },
  getPaymentDetail: async (id: string) => {
    return await apiUtils.getRequest(`${api.ORDERS}${id}/get_payment_detail/`);
  },
  confirmPayment: async ({ payload, id }: { payload: any; id: string }) => {
    return await apiUtils.postRequest(
      `${api.ORDERS}${id}/confirm_payment/`,
      payload
    );
  },
  getAllOrders: async () => {
    return await apiUtils.getRequest(`${api.ORDERS}`);
  },
  getOrder: async (id: string) => {
    return await apiUtils.getRequest(`${api.ORDERS}${id}/`);
  },
  createOrder: async (payload: { product: string; quantity: number }) => {
    return await apiUtils.postRequest(`${api.ORDERS}`, payload);
  },
  checkout: async ({
    payload,
  }: {
    payload: {
      collection_mode: string;
      receiving_address: string;
    };
  }) => {
    return await apiUtils.postRequest(`${api.ORDERS}check_out/`, payload);
  },
  addItemToCart: async (payload: { product: string; quantity: number }) => {
    return await apiUtils.postRequest(`${api.ORDERS}add_to_cart/`, payload);
  },
  removeItemFromCart: async (payload: { item_id: string }) => {
    return await apiUtils.postRequest(
      `${api.ORDERS}remove_from_cart/`,
      payload
    );
  },
  getAllCartItems: async () => {
    return await apiUtils.getRequest(`${api.ORDERS}cart/`);
  },
  getDeliveryFee: async (payload: { receiving_address: string }) => {
    return await apiUtils.postRequest(`${api.ORDERS}delivery_amount/`, payload);
  },
};

export default productService;
