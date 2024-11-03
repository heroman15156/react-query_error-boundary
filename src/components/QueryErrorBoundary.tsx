import React from 'react';
import { ErrorBoundary, FallbackProps } from 'react-error-boundary';
import { QueryErrorResetBoundary } from '@tanstack/react-query';
import { isNetworkError, isServerError } from '../utils/error';
import NetworkErrorFallback from './ErrorFallback/NetworkErrorFallback';
import ServerErrorFallback from './ErrorFallback/ServerErrorFallback';
import DefaultErrorFallback from './ErrorFallback/ErrorFallback';

type QueryErrorBoundary = {
  children: React.ReactNode;
  fallback: React.ComponentType<FallbackProps>;
  onReset?: () => void;
  keys?: Array<unknown>;
};

const QueryErrorBoundary = ({ children, fallback: CustomFallback, onReset, keys }: QueryErrorBoundary) => {
  const FallbackComponent = ({ error, resetErrorBoundary }: FallbackProps) => {
    if (isNetworkError(error)) {
      return <NetworkErrorFallback error={error} resetErrorBoundary={resetErrorBoundary} />;
    }

    if (isServerError(error)) {
      return <ServerErrorFallback error={error} resetErrorBoundary={resetErrorBoundary} />;
    }

    if (CustomFallback) {
      return <CustomFallback error={error} resetErrorBoundary={resetErrorBoundary} />;
    }

    return <DefaultErrorFallback error={error} resetErrorBoundary={resetErrorBoundary} />;
  };
  return (
    <QueryErrorResetBoundary>
      <ErrorBoundary
        fallbackRender={({ error, resetErrorBoundary }) => (
          <FallbackComponent error={error} resetErrorBoundary={resetErrorBoundary} />
        )}
        onReset={() => {
          console.log('ErrorBoundary');
        }}
      >
        {children}
      </ErrorBoundary>
    </QueryErrorResetBoundary>
  );
};

export default QueryErrorBoundary;
