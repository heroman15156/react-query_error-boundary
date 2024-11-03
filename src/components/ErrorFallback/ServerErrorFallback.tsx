import useErrorReset from '../../hooks/useErrorReset';
import { FallbackProps } from '../../types/error-boundary';

const ServerErrorFallback = ({ error, resetErrorBoundary }: FallbackProps) => {
  const { handleReset } = useErrorReset();

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="text-center p-8 max-w-md w-full">
        {/* 서버 수리 아이콘 */}
        <svg className="w-24 h-24 mx-auto mb-6 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M19 11V9a7 7 0 10-14 0v2m14 0a2 2 0 012 2v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4a2 2 0 012-2m14 0H5"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M12 15v2m0 0v2m0-2h2m-2 0H10"
            className="text-yellow-500"
          />
        </svg>

        <h2 className="text-2xl font-bold text-gray-900 mb-3">서버 점검 중</h2>
        <p className="text-gray-600 mb-2">일시적인 서버 오류가 발생했습니다</p>
        <p className="text-sm text-gray-500 mb-8">잠시 후 다시 시도해주세요</p>
        <button
          onClick={() => {
            handleReset(resetErrorBoundary);
          }}
          className="w-full py-3 px-6 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
        >
          새로고침
        </button>
      </div>
    </div>
  );
};
export default ServerErrorFallback;
