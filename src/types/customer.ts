export const ROLE_OPTIONS = {
  ADMIN: "admin",
  MANAGER: "manager"
} as const;

export type CustomerRole = typeof ROLE_OPTIONS[keyof typeof ROLE_OPTIONS];


export interface Customer {
  id: string;
  name: string;
  email: string ;
  role: string;
}


