export interface UserInfoType {
  id: number;
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  role: "admin" | "owner";
}
