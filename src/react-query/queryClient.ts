import { QueryCache, QueryClient } from '@tanstack/react-query';
import { isExpectedError, RequestError } from '../lib/RequestError';
import { AxiosError } from 'axios';
import toast from 'react-hot-toast';
import { handleQueryError } from '../utils/error';

interface QueryErrorMeta {
  errorMessage?: string;
}
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      throwOnError: handleQueryError,
    },
  },
  queryCache: new QueryCache({
    onError: (error) => {
      console.log(error, 'react query');
    },
  }),
});

export default queryClient;
