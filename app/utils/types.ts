export interface UserInfo {
  id: string;
  email: string;
  firstname: string;
  lastname: string;
}

export interface PageProps {
  params?: any;
  searchParams: {
    tab: string;
  };
}

export interface User {
  display_name: string;
  bvn: string;
  firstname: string;
  currency: string;
  lastname: string;
  email: string;
  date_of_birth: string;
  gender: string;
  email_alert: boolean;
  mobile_number: string;
}