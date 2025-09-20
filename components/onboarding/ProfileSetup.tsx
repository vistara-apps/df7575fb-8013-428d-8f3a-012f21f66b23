'use client';

import { useState } from 'react';

interface ProfileSetupProps {
  userData: {
    username: string;
    bio: string;
    location: string;
  };
  onUpdate: (data: Partial<ProfileSetupProps['userData']>) => void;
}

export function ProfileSetup({ userData, onUpdate }: ProfileSetupProps) {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateField = (field: string, value: string) => {
    const newErrors = { ...errors };

    switch (field) {
      case 'username':
        if (!value.trim()) {
          newErrors.username = 'Username is required';
        } else if (value.length < 3) {
          newErrors.username = 'Username must be at least 3 characters';
        } else if (!/^[a-zA-Z0-9_]+$/.test(value)) {
          newErrors.username = 'Username can only contain letters, numbers, and underscores';
        } else {
          delete newErrors.username;
        }
        break;
      case 'location':
        if (!value.trim()) {
          newErrors.location = 'Location is required';
        } else {
          delete newErrors.location;
        }
        break;
    }

    setErrors(newErrors);
  };

  const handleInputChange = (field: string, value: string) => {
    onUpdate({ [field]: value });
    validateField(field, value);
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-textPrimary mb-2">
          Create Your Profile
        </h2>
        <p className="text-textSecondary">
          Tell us a bit about yourself to help other players find you
        </p>
      </div>

      <div className="space-y-4">
        {/* Username */}
        <div>
          <label htmlFor="username" className="block text-sm font-medium text-textPrimary mb-2">
            Username *
          </label>
          <input
            type="text"
            id="username"
            value={userData.username}
            onChange={(e) => handleInputChange('username', e.target.value)}
            className="w-full px-3 py-2 bg-surface border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-textPrimary"
            placeholder="Enter your username"
          />
          {errors.username && (
            <p className="text-red-400 text-sm mt-1">{errors.username}</p>
          )}
        </div>

        {/* Bio */}
        <div>
          <label htmlFor="bio" className="block text-sm font-medium text-textPrimary mb-2">
            Bio
          </label>
          <textarea
            id="bio"
            value={userData.bio}
            onChange={(e) => onUpdate({ bio: e.target.value })}
            className="w-full px-3 py-2 bg-surface border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-textPrimary resize-none"
            rows={3}
            placeholder="Tell us about your nohejbal experience..."
          />
          <p className="text-xs text-textSecondary mt-1">
            {userData.bio.length}/200 characters
          </p>
        </div>

        {/* Location */}
        <div>
          <label htmlFor="location" className="block text-sm font-medium text-textPrimary mb-2">
            Location *
          </label>
          <input
            type="text"
            id="location"
            value={userData.location}
            onChange={(e) => handleInputChange('location', e.target.value)}
            className="w-full px-3 py-2 bg-surface border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-textPrimary"
            placeholder="e.g., Prague, Czech Republic"
          />
          {errors.location && (
            <p className="text-red-400 text-sm mt-1">{errors.location}</p>
          )}
        </div>
      </div>

      <div className="bg-surface p-4 rounded-lg">
        <h3 className="font-semibold text-textPrimary mb-2">Privacy Note</h3>
        <p className="text-sm text-textSecondary">
          Your profile information will be visible to other users in the Nohejbal Hub community.
          You can update your privacy settings later.
        </p>
      </div>
    </div>
  );
}

