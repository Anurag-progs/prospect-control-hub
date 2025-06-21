
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'super_admin' | 'manager' | 'sales_person';
  avatar?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}
