import { useQueryClient, useQueryErrorResetBoundary } from '@tanstack/react-query';

const useErrorReset = () => {
  const { reset } = useQueryErrorResetBoundary();

  const handleReset = (resetErrorBoundary: () => void) => {
    reset();
    resetErrorBoundary();
  };
  return { handleReset };
};

export default useErrorReset;
