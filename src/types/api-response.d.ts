export interface ApiResponseType<T> {
  data: T[];
  limit: number;
  message: string;
  page: number;
  status: boolean;
  totalData: number;
  totalPage: number;
}

export type PaginationType = Omit<
  ApiResponseType<null>,
  "data" | "message" | "status" | "totalData" | "totalPage"
>;
