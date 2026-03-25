import {
  ApiResponse,
  PaginationMeta,
  PaginationResponse,
} from '../interfaces/api-response.interface';

export function successResponse<T>(
  data: T,
  message = 'Success',
  statusCode = 200,
): ApiResponse<T> {
  return {
    statusCode,
    message,
    data,
  };
}

export function paginationResponse<T>(
  data: T[],
  meta: PaginationMeta,
  message = 'Success',
  statusCode = 200,
): PaginationResponse<T> {
  return {
    statusCode,
    message,
    data,
    meta,
  };
}
