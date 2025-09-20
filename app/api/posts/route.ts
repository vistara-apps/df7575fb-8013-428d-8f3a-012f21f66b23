import { NextRequest, NextResponse } from 'next/server';
import { MOCK_POSTS } from '@/lib/constants';
import { Post, Comment } from '@/lib/types';

// In-memory storage for demo purposes
let posts: Post[] = [...MOCK_POSTS];

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const postId = searchParams.get('postId');
    const userId = searchParams.get('userId');
    const contentType = searchParams.get('contentType');

    if (postId) {
      const post = posts.find(p => p.postId === postId);
      if (!post) {
        return NextResponse.json(
          { error: 'Post not found', success: false },
          { status: 404 }
        );
      }
      return NextResponse.json({
        data: post,
        success: true,
        message: 'Post retrieved successfully'
      });
    }

    let filteredPosts = posts;

    if (userId) {
      filteredPosts = filteredPosts.filter(post => post.userId === userId);
    }

    if (contentType) {
      filteredPosts = filteredPosts.filter(post => post.contentType === contentType);
    }

    // Sort by timestamp (newest first)
    filteredPosts.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

    return NextResponse.json({
      data: filteredPosts,
      success: true,
      message: 'Posts retrieved successfully'
    });
  } catch (error) {
    console.error('Error fetching posts:', error);
    return NextResponse.json(
      { error: 'Failed to fetch posts', success: false },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, contentType, caption, contentUrl } = body;

    // Validate required fields
    if (!userId || !contentType || !caption) {
      return NextResponse.json(
        { error: 'Missing required fields: userId, contentType, caption', success: false },
        { status: 400 }
      );
    }

    const newPost: Post = {
      postId: generateId(),
      userId,
      contentUrl,
      contentType,
      caption,
      timestamp: new Date().toISOString(),
      likes: 0,
      comments: [],
    };

    posts.push(newPost);

    return NextResponse.json({
      data: newPost,
      success: true,
      message: 'Post created successfully'
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating post:', error);
    return NextResponse.json(
      { error: 'Failed to create post', success: false },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { postId, action, ...updates } = body;

    if (!postId) {
      return NextResponse.json(
        { error: 'Post ID is required', success: false },
        { status: 400 }
      );
    }

    const postIndex = posts.findIndex(post => post.postId === postId);
    if (postIndex === -1) {
      return NextResponse.json(
        { error: 'Post not found', success: false },
        { status: 404 }
      );
    }

    const post = posts[postIndex];

    // Handle like/unlike action
    if (action === 'like') {
      posts[postIndex] = { ...post, likes: post.likes + 1 };
    } else if (action === 'unlike') {
      posts[postIndex] = { ...post, likes: Math.max(0, post.likes - 1) };
    } else if (action === 'comment') {
      const { userId, content } = updates;
      if (!userId || !content) {
        return NextResponse.json(
          { error: 'Missing required fields for comment: userId, content', success: false },
          { status: 400 }
        );
      }

      const newComment: Comment = {
        commentId: generateId(),
        userId,
        content,
        timestamp: new Date().toISOString(),
      };

      posts[postIndex] = {
        ...post,
        comments: [...post.comments, newComment]
      };
    } else {
      // General update
      posts[postIndex] = { ...post, ...updates };
    }

    return NextResponse.json({
      data: posts[postIndex],
      success: true,
      message: 'Post updated successfully'
    });
  } catch (error) {
    console.error('Error updating post:', error);
    return NextResponse.json(
      { error: 'Failed to update post', success: false },
      { status: 500 }
    );
  }
}

function generateId(): string {
  return Math.random().toString(36).substr(2, 9);
}
