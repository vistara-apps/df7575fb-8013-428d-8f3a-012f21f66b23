// Error handling utilities for the Nohejbal Hub app

export interface AppError {
  code: string;
  message: string;
  details?: any;
}

export class AppErrorHandler {
  static handle(error: any): AppError {
    console.error('Error handled:', error);

    // Handle different types of errors
    if (isAppError(error)) {
      return error;
    }

    if (error?.response) {
      // API error
      return {
        code: `API_${error.response.status}`,
        message: error.response.data?.message || 'API request failed',
        details: error.response.data,
      };
    }

    if (error?.code) {
      // Error with code
      return {
        code: error.code,
        message: error.message || 'An error occurred',
        details: error,
      };
    }

    // Generic error
    return {
      code: 'UNKNOWN_ERROR',
      message: error?.message || 'An unexpected error occurred',
      details: error,
    };
  }

  static getErrorMessage(error: AppError): string {
    switch (error.code) {
      case 'NETWORK_ERROR':
        return 'Network connection failed. Please check your internet connection.';
      case 'API_400':
        return 'Invalid request. Please check your input.';
      case 'API_401':
        return 'Authentication required. Please log in again.';
      case 'API_403':
        return 'Access denied. You don\'t have permission to perform this action.';
      case 'API_404':
        return 'Resource not found.';
      case 'API_409':
        return 'Conflict with existing data. Please try again.';
      case 'API_500':
        return 'Server error. Please try again later.';
      default:
        return error.message;
    }
  }

  static logError(error: AppError, context?: string): void {
    const logData = {
      timestamp: new Date().toISOString(),
      error,
      context,
      userAgent: typeof window !== 'undefined' ? window.navigator.userAgent : 'server',
      url: typeof window !== 'undefined' ? window.location.href : 'server',
    };

    console.error('App Error:', logData);

    // In production, you might want to send this to an error reporting service
    // like Sentry, LogRocket, or similar
  }
}

// Custom error classes
export class ValidationError extends Error implements AppError {
  code = 'VALIDATION_ERROR';
  details?: any;

  constructor(message: string, details?: any) {
    super(message);
    this.name = 'ValidationError';
    this.details = details;
  }
}

export class NetworkError extends Error implements AppError {
  code = 'NETWORK_ERROR';
  details?: any;

  constructor(message: string = 'Network request failed', details?: any) {
    super(message);
    this.name = 'NetworkError';
    this.details = details;
  }
}

export class AuthenticationError extends Error implements AppError {
  code = 'AUTH_ERROR';
  details?: any;

  constructor(message: string = 'Authentication failed', details?: any) {
    super(message);
    this.name = 'AuthenticationError';
    this.details = details;
  }
}

// Utility functions
export function isAppError(error: any): error is AppError {
  return error && typeof error.code === 'string' && typeof error.message === 'string';
}

export function createError(code: string, message: string, details?: any): AppError {
  return { code, message, details };
}

// React hook for error handling
export function useErrorHandler() {
  const handleError = (error: any, context?: string) => {
    const appError = AppErrorHandler.handle(error);
    AppErrorHandler.logError(appError, context);
    return appError;
  };

  return { handleError };
}
