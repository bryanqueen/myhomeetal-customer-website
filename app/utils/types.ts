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