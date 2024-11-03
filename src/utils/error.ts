import { Query, QueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { isExpectedError } from '../lib/RequestError';
import toast from 'react-hot-toast';

export type QueryErrorMeta = {
  errorMessage?: string;
};

type ErrorResponse = {
  message: string;
  code?: string;
};

export const findFailedQueryByError = (queryClient: QueryClient, currentError: unknown) => {
  const failedQueries = queryClient.getQueryCache().findAll({
    predicate: (query) => query.state.status === 'error',
  });

  console.log('');

  return failedQueries.find((query) => {
    const queryError = query.state.error;
    if (queryError instanceof AxiosError && currentError instanceof AxiosError) {
      return (
        queryError.config?.url === currentError.config?.url && queryError.config?.method === currentError.config?.method
      );
    }
    return false;
  });
};

export const getErrorMessage = (error: unknown, query?: Query) => {
  if (error instanceof AxiosError) {
    if (query?.meta?.errorMessage) {
      return query.meta.errorMessage;
    }
    return error.response?.data?.message || error.message;
  }
  return '예상치 못한 오류가 발생했습니다';
};

export const extractErrorMessage = (error: AxiosError<ErrorResponse>, query: Query): string => {
  const meta = query.meta as QueryErrorMeta | undefined;

  return meta?.errorMessage || error.response?.data?.message || error.message;
};

export const handleQueryError = (error: unknown, query: Query): boolean => {
  if (!(error instanceof AxiosError)) {
    return true;
  }

  const status = error.status || 500;

  if (!isExpectedError(status)) {
    return true;
  }
  if (isAuthOrConflictError(status)) {
    return false;
  }

  const message = extractErrorMessage(error, query);
  toast.error(message);

  return false;
};

export const isNetworkError = (error: unknown): boolean => {
  return error instanceof AxiosError && !error.response;
};

export const isServerError = (error: unknown): boolean => {
  return error instanceof AxiosError && error.response?.status !== undefined && error.response.status >= 500;
};

export const isAuthOrConflictError = (status: number) => {
  return status === 401 || status === 403;
};
