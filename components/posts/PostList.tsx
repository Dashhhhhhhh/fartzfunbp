'use client';

import { useEffect, useState } from 'react';

type Post = {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  author: {
    name: string | null;
    email: string | null;
  };
};

export function PostList() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('/api/posts');
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (isLoading) {
    return <div className="text-center">Loading posts...</div>;
  }

  if (posts.length === 0) {
    return <div className="text-center">No posts yet. Be the first to share!</div>;
  }

  return (
    <div className="space-y-6">
      {posts.map((post) => (
        <article
          key={post.id}
          className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm"
        >
          <h2 className="text-xl font-bold mb-2">{post.title}</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">{post.content}</p>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Posted by {post.author.name || post.author.email} on{' '}
            {new Date(post.createdAt).toLocaleDateString()}
          </div>
        </article>
      ))}
    </div>
  );
}