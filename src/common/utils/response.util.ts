import {
  ApiResponse,
  PaginationMeta,
  PaginationResponse,
} from '../interfaces/api-response.interface';

export function successResponse<T>(
  content: T,
  message = 'Success',
  statusCode = 200,
): ApiResponse<T> {
  return {
    statusCode,
    message,
    content,
  };
}

export function paginationResponse<T>(
  content: T[],
  meta: PaginationMeta,
  message = 'Success',
  statusCode = 200,
): PaginationResponse<T> {
  return {
    statusCode,
    message,
    content,
    meta,
  };
}
