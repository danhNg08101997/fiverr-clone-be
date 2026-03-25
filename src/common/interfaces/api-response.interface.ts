export interface ApiResponse<T> {
  statusCode: number;
  message: string;
  data: T;
}

export interface PaginationMeta {
  pageIndex: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
}

export interface PaginationResponse<T> {
  statusCode: number;
  message: string;
  data: T[];
  meta: PaginationMeta;
}
