import React from 'react';
import DefaultErrorFallback from '../components/ErrorFallback/ErrorFallback';
import QueryErrorBoundary from '../components/QueryErrorBoundary';

const ErrorBoundaryProvider = ({ children }: { children: React.ReactNode }) => {
  return <QueryErrorBoundary fallback={DefaultErrorFallback}>{children}</QueryErrorBoundary>;
};

export default ErrorBoundaryProvider;
