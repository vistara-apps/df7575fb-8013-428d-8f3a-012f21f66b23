'use client';

import React from 'react';
import { CTAButton } from './CTAButton';

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ComponentType<{ error?: Error; resetError: () => void }>;
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  resetError = () => {
    this.setState({ hasError: false, error: undefined });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        const FallbackComponent = this.props.fallback;
        return <FallbackComponent error={this.state.error} resetError={this.resetError} />;
      }

      return <DefaultErrorFallback error={this.state.error} resetError={this.resetError} />;
    }

    return this.props.children;
  }
}

function DefaultErrorFallback({ error, resetError }: { error?: Error; resetError: () => void }) {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="text-center max-w-md">
        <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
          <span className="text-2xl">⚠️</span>
        </div>

        <h1 className="text-2xl font-bold text-textPrimary mb-4">
          Something went wrong
        </h1>

        <p className="text-textSecondary mb-6">
          We encountered an unexpected error. Please try refreshing the page or contact support if the problem persists.
        </p>

        {error && (
          <details className="mb-6 text-left">
            <summary className="cursor-pointer text-sm text-textSecondary mb-2">
              Error details
            </summary>
            <pre className="text-xs bg-surface p-3 rounded overflow-auto">
              {error.message}
            </pre>
          </details>
        )}

        <div className="space-y-3">
          <CTAButton variant="primary" onClick={resetError}>
            Try Again
          </CTAButton>

          <CTAButton
            variant="outline"
            onClick={() => window.location.reload()}
          >
            Refresh Page
          </CTAButton>
        </div>
      </div>
    </div>
  );
}

