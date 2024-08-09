import { api } from "../utils/api";
import { apiUtils } from "../utils/apiUtils";


const productService = {
  getAllProducts: async (params?: string) => {
    return await apiUtils.getRequest(`${api.PRODUCTS}?${params}`);
  },
  getUserDetails: async (id?: string) => {
    return await apiUtils.getRequest(`${api.GET_USER}${id}`);
  },
  getReview: async (id?: string) => {
    return await apiUtils.getRequest(`${api.REVIEW}${id}`);
  },
  getCart: async () => {
    return await apiUtils.getRequest(`${api.CART}`);
  },
  getUserReferrals: async () => {
    return await apiUtils.getRequest(`${api.GET_REFERRALS}`);
  },
  saveProduct: async ({ payload, id }: { payload: any; id: string }) => {
    return await apiUtils.postRequest(`user/save-item/${id}`, payload);
  },
  addToCart: async (id: string ) => {
    return await apiUtils.postRequest(`${api.CART}/${id}`);
  },
  payWithWallet: async (payload: { orderId: any; narration: string; amount: number; from_account_number: any }) => {
    return await apiUtils.postRequest(`payment/wallet`, payload);
  },
  updateUser: async (payload: { firstName: string; lastName: string; phone_number: string; email: string }) => {
    return await apiUtils.putRequest(`user/edit-profile`, payload);
  },
  updateOrder: async (payload: { orderId: string; points: number}) => {
    return await apiUtils.putRequest(`payment/spay`, payload);
  },
  getSavedProducts: async (id?: string) => {
    return await apiUtils.getRequest(`user/saved-items`);
  },
  removeSavedProduct: async (payload: { productId: string }) => {
    return await apiUtils.deleteRequest(`user/saved-item`, payload);
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
    return await apiUtils.postRequest(`${api.ORDERS}${id}/confirm_payment/`, payload);
  },
  createReview: async ({ payload, id }: { payload: { rating: number; comment: string }; id: string }) => {
    return await apiUtils.postRequest(`${api.REVIEW}${id}`, payload);
  },
  getAllOrders: async () => {
    return await apiUtils.getRequest(`${api.GET_ORDERS}`);
  },
  getOrder: async (id: string) => {
    return await apiUtils.getRequest(`${api.ORDERS}${id}/`);
  },
  getWallet: async () => {
    return await apiUtils.getRequest(`${api.GET_WALLET}`);
  },
  getWalletTrans: async () => {
    return await apiUtils.getRequest(`${api.GET_WALLET_TRANACTIONS}`);
  },
  getAddress: async () => {
    return await apiUtils.getRequest(`${api.GET_ADDRESS}`);
  },
  createAddress: async (payload: { deliveryAddress: string; phone_number: string; city: string }) => {
    return await apiUtils.postRequest(`${api.GET_ADDRESS}`, payload);
  },
  updateAddress: async (payload: { addressId: string; deliveryAddress: string; phone_number: string; city: string }) => {
    return await apiUtils.putRequest(`${api.GET_ADDRESS}`, payload);
  },
  updateCartItem: async (payload: { productId: string }) => {
    return await apiUtils.putRequest(`${api.CART}`, payload);
  },
  createOrder: async (payload: { address: string; orderPrice: number; orderItems: { product: string; qty: number; price: number }[]; deliveryMethod: string; paymentMethod: string }) => {
    return await apiUtils.postRequest(`${api.ORDERS}`, payload);
  },
  createWallet: async (payload: { display_name: string; bvn: string; firstname: string; currency: string; lastname: string; email: string; date_of_birth: string; gender: string; email_alert: boolean; mobile_number: string }) => {
    return await apiUtils.postRequest(`${api.WALLET}`, payload);
  },
  checkout: async ({ payload }: { payload: { collection_mode: string; receiving_address: string } }) => {
    return await apiUtils.postRequest(`${api.ORDERS}check_out/`, payload);
  },
  addItemToCart: async (payload: { product: string; quantity: number }) => {
    return await apiUtils.postRequest(`${api.ORDERS}add_to_cart/`, payload);
  },
  deleteUser: async (payload: { password: string }) => {
    return await apiUtils.deleteRequest(`${api.DELETE_USER}`, payload);
  },
  deleteAddress: async (payload: { addressId: string }) => {
    return await apiUtils.deleteRequest(`${api.GET_ADDRESS}`, payload);
  },
  deleteCartItem: async (payload: { productId: string }) => {
    return await apiUtils.deleteRequest(`${api.CART}`, payload);
  },
  getAllCartItems: async () => {
    return await apiUtils.getRequest(`${api.ORDERS}cart/`);
  },
  getDeliveryFee: async (payload: { receiving_address: string }) => {
    return await apiUtils.postRequest(`${api.ORDERS}delivery_amount/`, payload);
  },
};

export default productService;
