export function WelcomeScreen() {
  return (
    <div className="text-center py-8">
      <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-6">
        <span className="text-4xl">🏐</span>
      </div>

      <h1 className="text-3xl font-bold text-textPrimary mb-4">
        Welcome to Nohejbal Hub
      </h1>

      <p className="text-lg text-textSecondary mb-6">
        Connect, Compete, and Conquer the Nohejbal World
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="text-center">
          <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center mx-auto mb-3">
            <span className="text-xl">🎯</span>
          </div>
          <h3 className="font-semibold text-textPrimary mb-2">Find Players</h3>
          <p className="text-sm text-textSecondary">
            Connect with players at your skill level
          </p>
        </div>

        <div className="text-center">
          <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mx-auto mb-3">
            <span className="text-xl">📊</span>
          </div>
          <h3 className="font-semibold text-textPrimary mb-2">Track Progress</h3>
          <p className="text-sm text-textSecondary">
            Monitor your team's performance
          </p>
        </div>

        <div className="text-center">
          <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center mx-auto mb-3">
            <span className="text-xl">📱</span>
          </div>
          <h3 className="font-semibold text-textPrimary mb-2">Share Moments</h3>
          <p className="text-sm text-textSecondary">
            Share your nohejbal experiences
          </p>
        </div>
      </div>

      <div className="bg-surface p-4 rounded-lg">
        <p className="text-sm text-textSecondary">
          Join thousands of nohejbal players from around the Czech Republic.
          Whether you're a beginner or a professional, there's a place for you here.
        </p>
      </div>
    </div>
  );
}

