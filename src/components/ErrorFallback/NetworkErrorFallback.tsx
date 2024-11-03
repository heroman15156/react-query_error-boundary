import useErrorReset from '../../hooks/useErrorReset';
import { FallbackProps } from 'react-error-boundary';

const NetworkErrorFallback = ({ error, resetErrorBoundary }: FallbackProps) => {
  const { handleReset } = useErrorReset();

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="text-center p-8 max-w-md w-full">
        {/* WiFi 끊김 아이콘 */}
        <svg className="w-24 h-24 mx-auto mb-6 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.07c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0"
          />
          <path strokeLinecap="round" strokeWidth={1.5} d="M2 2L22 22" className="text-red-500" />
        </svg>

        <h2 className="text-2xl font-bold text-gray-900 mb-3">인터넷 연결 끊김</h2>
        <p className="text-gray-600 mb-8">네트워크 연결을 확인하고 다시 시도해주세요</p>
        <button
          onClick={() => {
            handleReset(resetErrorBoundary);
          }}
          className="w-full py-3 px-6 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
        >
          다시 연결하기
        </button>
      </div>
    </div>
  );
};

export default NetworkErrorFallback;
