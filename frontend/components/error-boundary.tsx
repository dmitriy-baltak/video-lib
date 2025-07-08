'use client';

import { ErrorBoundary } from 'react-error-boundary';
import { ErrorState } from '@/components/states/error-state';

function ErrorFallback({ resetErrorBoundary }: { resetErrorBoundary: () => void }) {
  return (
    <ErrorState
      title="Application Error"
      message="Something unexpected happened. Please try refreshing the page."
      onRetry={resetErrorBoundary}
      retryLabel="Try Again"
      variant="page"
    />
  );
}

interface AppErrorBoundaryProps {
  children: React.ReactNode;
}

export function AppErrorBoundary({ children }: AppErrorBoundaryProps) {
  return (
    <ErrorBoundary 
      FallbackComponent={ErrorFallback}
      onError={(error) => {
        console.error('Application error:', error);
      }}
    >
      {children}
    </ErrorBoundary>
  );
}
