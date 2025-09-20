import { Post, User } from '@/lib/types';
import { formatDate } from '@/lib/utils';
import { useState } from 'react';

interface FeedPostProps {
  post: Post;
  author: User;
  variant?: 'image' | 'video' | 'text';
  className?: string;
}

export function FeedPost({ post, author, variant = 'text', className = '' }: FeedPostProps) {
  const [liked, setLiked] = useState(false);
  const [showComments, setShowComments] = useState(false);

  const handleLike = () => {
    setLiked(!liked);
  };

  return (
    <div className={`card hover:shadow-lg transition-shadow duration-200 ${className}`}>
      {/* Post Header */}
      <div className="flex items-center space-x-3 mb-4">
        <div className="w-10 h-10 rounded-full overflow-hidden bg-primary flex items-center justify-center">
          {author.avatar ? (
            <img src={author.avatar} alt={author.username} className="w-full h-full object-cover" />
          ) : (
            <span className="text-white font-bold text-sm">
              {author.username.charAt(0).toUpperCase()}
            </span>
          )}
        </div>
        <div className="flex-1">
          <p className="font-semibold text-textPrimary">{author.username}</p>
          <p className="text-sm text-textSecondary">{formatDate(post.timestamp)}</p>
        </div>
        <button className="p-2 hover:bg-white hover:bg-opacity-10 rounded-lg transition-colors duration-200">
          <span className="text-textSecondary">⋯</span>
        </button>
      </div>

      {/* Post Content */}
      {variant === 'image' && (
        <div className="mb-4 rounded-lg overflow-hidden bg-surface">
          <div className="aspect-video bg-gradient-to-br from-primary to-accent flex items-center justify-center">
            <span className="text-white text-4xl">📷</span>
          </div>
        </div>
      )}

      {variant === 'video' && (
        <div className="mb-4 rounded-lg overflow-hidden bg-surface">
          <div className="aspect-video bg-gradient-to-br from-accent to-primary flex items-center justify-center relative">
            <span className="text-white text-4xl">▶️</span>
            <div className="absolute bottom-2 right-2 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded">
              2:34
            </div>
          </div>
        </div>
      )}

      <div className="mb-4">
        <p className="text-textPrimary leading-relaxed">{post.caption}</p>
      </div>

      {/* Post Actions */}
      <div className="flex items-center justify-between pt-4 border-t border-white border-opacity-10">
        <div className="flex items-center space-x-6">
          <button
            onClick={handleLike}
            className={`flex items-center space-x-2 transition-colors duration-200 ${
              liked ? 'text-red-400' : 'text-textSecondary hover:text-textPrimary'
            }`}
          >
            <span className="text-lg">{liked ? '❤️' : '🤍'}</span>
            <span className="text-sm font-medium">
              {post.likes + (liked ? 1 : 0)}
            </span>
          </button>
          
          <button
            onClick={() => setShowComments(!showComments)}
            className="flex items-center space-x-2 text-textSecondary hover:text-textPrimary transition-colors duration-200"
          >
            <span className="text-lg">💬</span>
            <span className="text-sm font-medium">{post.comments.length}</span>
          </button>
          
          <button className="flex items-center space-x-2 text-textSecondary hover:text-textPrimary transition-colors duration-200">
            <span className="text-lg">🔄</span>
            <span className="text-sm font-medium">Share</span>
          </button>
        </div>
      </div>

      {/* Comments Section */}
      {showComments && (
        <div className="mt-4 pt-4 border-t border-white border-opacity-10">
          <div className="space-y-3">
            {post.comments.length === 0 ? (
              <p className="text-textSecondary text-sm">No comments yet. Be the first to comment!</p>
            ) : (
              post.comments.map((comment) => (
                <div key={comment.commentId} className="flex space-x-3">
                  <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                    <span className="text-white text-xs font-bold">U</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-textPrimary">{comment.content}</p>
                    <p className="text-xs text-textSecondary mt-1">
                      {formatDate(comment.timestamp)}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
          
          <div className="mt-4 flex space-x-3">
            <div className="w-8 h-8 rounded-full bg-surface flex items-center justify-center">
              <span className="text-textSecondary text-xs">You</span>
            </div>
            <div className="flex-1">
              <input
                type="text"
                placeholder="Add a comment..."
                className="w-full bg-surface text-textPrimary placeholder-textSecondary px-3 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
