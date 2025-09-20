'use client';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen bg-bg flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="mb-6">
          <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">⚠️</span>
          </div>
          <h2 className="text-2xl font-bold text-textPrimary mb-2">
            Something went wrong!
          </h2>
          <p className="text-textSecondary">
            We encountered an error while loading the app.
          </p>
        </div>
        <button
          onClick={reset}
          className="btn-primary"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
