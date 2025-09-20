'use client';

import { useState } from 'react';
import { FeedPost } from '@/components/ui/FeedPost';
import { CTAButton } from '@/components/ui/CTAButton';
import { MOCK_POSTS, MOCK_USERS, CONTENT_TYPES } from '@/lib/constants';

export function FanContentHub() {
  const [selectedContentType, setSelectedContentType] = useState<string>('all');
  const [showCreatePost, setShowCreatePost] = useState(false);

  const filteredPosts = MOCK_POSTS.filter(post => {
    if (selectedContentType === 'all') return true;
    return post.contentType === selectedContentType;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-textPrimary">Community Feed</h2>
          <CTAButton
            variant="primary"
            size="sm"
            onClick={() => setShowCreatePost(!showCreatePost)}
          >
            ✏️ Create Post
          </CTAButton>
        </div>

        {/* Content Type Filter */}
        <div className="flex space-x-2 overflow-x-auto pb-2">
          <button
            onClick={() => setSelectedContentType('all')}
            className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors duration-200 ${
              selectedContentType === 'all'
                ? 'bg-primary text-white'
                : 'bg-surface text-textSecondary hover:text-textPrimary'
            }`}
          >
            All Posts
          </button>
          {CONTENT_TYPES.map((type) => (
            <button
              key={type.value}
              onClick={() => setSelectedContentType(type.value)}
              className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors duration-200 ${
                selectedContentType === type.value
                  ? 'bg-primary text-white'
                  : 'bg-surface text-textSecondary hover:text-textPrimary'
              }`}
            >
              {type.icon} {type.label}
            </button>
          ))}
        </div>
      </div>

      {/* Create Post Form */}
      {showCreatePost && (
        <div className="card animate-slide-up">
          <h3 className="text-lg font-semibold text-textPrimary mb-4">Create New Post</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-textSecondary mb-2">
                Content Type
              </label>
              <select className="w-full bg-surface text-textPrimary border border-white border-opacity-10 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary">
                {CONTENT_TYPES.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.icon} {type.label}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-textSecondary mb-2">
                Caption
              </label>
              <textarea
                placeholder="Share your nohejbal moment..."
                rows={3}
                className="w-full bg-surface text-textPrimary border border-white border-opacity-10 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary placeholder-textSecondary resize-none"
              />
            </div>

            <div className="flex space-x-3">
              <CTAButton variant="primary" className="flex-1">
                📤 Post
              </CTAButton>
              <CTAButton 
                variant="outline" 
                className="flex-1"
                onClick={() => setShowCreatePost(false)}
              >
                Cancel
              </CTAButton>
            </div>
          </div>
        </div>
      )}

      {/* Posts Feed */}
      <div className="space-y-6">
        {filteredPosts.length === 0 ? (
          <div className="card text-center py-8">
            <div className="text-4xl mb-4">📝</div>
            <p className="text-textSecondary">
              No posts found. Be the first to share something!
            </p>
          </div>
        ) : (
          filteredPosts.map((post) => {
            const author = MOCK_USERS.find(user => user.userId === post.userId) || MOCK_USERS[0];
            return (
              <FeedPost
                key={post.postId}
                post={post}
                author={author}
                variant={post.contentType}
              />
            );
          })
        )}
      </div>
    </div>
  );
}
