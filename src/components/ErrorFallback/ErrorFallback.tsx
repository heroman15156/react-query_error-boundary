import { useQueryClient } from '@tanstack/react-query';
import { findFailedQueryByError, getErrorMessage } from '../../utils/error';

import useErrorReset from '../../hooks/useErrorReset';
import { FallbackProps } from 'react-error-boundary';

const DefaultErrorFallback = ({ error, resetErrorBoundary }: FallbackProps) => {
  const queryClient = useQueryClient();
  const failedQuery = findFailedQueryByError(queryClient, error);
  const errorMessage = getErrorMessage(error, failedQuery);

  const { handleReset } = useErrorReset();

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="text-center p-8 max-w-md w-full">
        {/* 일반 에러 아이콘 */}
        <svg className="w-24 h-24 mx-auto mb-6 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <circle cx="12" cy="12" r="10" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4m0 4h.01" />
        </svg>

        <h2 className="text-2xl font-bold text-gray-900 mb-3">오류가 발생했습니다</h2>
        <p className="text-gray-600 mb-8">{errorMessage}</p>
        <button
          onClick={() => {
            handleReset(resetErrorBoundary);
          }}
          className="w-full py-3 px-6 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
        >
          다시 시도
        </button>
      </div>
    </div>
  );
};

export default DefaultErrorFallback;
