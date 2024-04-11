'use client';

import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import InfiniteScroll from 'react-infinite-scroll-component';
import notify from '@/utils/notify';
import { Post } from '@/components/Post';
import { Post as PostType } from '@/types/posts';

const fetchPosts = async (page: number) => {
  const res = await fetch(`/api/posts?page=${page}`);
  if (!res.ok) throw new Error('Unable to fetch posts');

  return (await res.json().then((res) => res.data)) as PostType[];
};

export default function Dashboard() {
  const session = useSession();
  const [posts, setPosts] = useState<PostType[]>([]);
  const [page, setPage] = useState(1);
  const [morePosts, setMorePosts] = useState(true);
  const [content, setContent] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const addPost = async () => {
    setSubmitting(true);
    try {
      const res = await fetch('/api/posts/', {
        method: 'POST',
        body: JSON.stringify({ content, author: session.data?.user._doc._id }),
      });
      if (!res.ok) throw new Error('Failed to add post');
      setContent('');
      const resJSON = await res.json();
      const newPost = resJSON.data;
      setPosts((currentState) => [newPost, ...currentState]);
      setSubmitting(false);
      notify('Success', 'Post added');
    } catch {
      notify('Error', 'Unable to add post');
    }
  };

  const deletePost = async (postId: string) => {
    try {
      const res = await fetch(`/api/posts/${postId}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete post');
      const resJSON: { data: PostType } = await res.json();
      setPosts((state) => state.filter((currPost) => currPost._id != resJSON.data._id));
      notify('Success', 'Post deleted');
    } catch {
      notify('Error', 'Unable to delete post');
    }
  };

  useEffect(() => {
    fetchPosts(page)
      .then((olderPosts) => {
        if (olderPosts.length === 0) setMorePosts(false);
        else setPosts((currentPosts) => [...currentPosts, ...olderPosts]);
      })
      .catch(() => notify('Error', 'Unable to retrieve posts'));
  }, [page]);

  return (
    <main className='h-full'>
      <h1 className='font-bold text-2xl mb-5'>Dashboard</h1>
      <form>
        <textarea
          className='py-3 px-4 block w-full border border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400'
          placeholder='Write a post'
          disabled={submitting}
          rows={2}
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <div className='flex justify-end'>
          <button
            type='button'
            className='mt-3 disabled:cursor-not-allowed disabled:border-gray-200 disabled:text-gray-500 disabled:ring-gray-200 disabled:hover:bg-gray-200 py-1 px-4 inline-flexgap-2 rounded-md border-2 border-green-200 font-semibold text-green-500 hover:text-white hover:bg-green-500 hover:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800 '
            disabled={content === '' || submitting}
            onClick={addPost}
          >
            {submitting ? (
              <div
                className='animate-spin inline-block w-4 h-4 border-[3px] border-current border-t-transparent text-gray-400 rounded-full'
                role='status'
                aria-label='loading'
              >
                <span className='sr-only'>Loading...</span>
              </div>
            ) : (
              'Save'
            )}
          </button>
        </div>
      </form>
      <InfiniteScroll
        style={{ overflow: 'unset' }}
        scrollableTarget='main-card'
        dataLength={posts.length}
        next={() => setPage((currPage) => currPage + 1)}
        hasMore={morePosts}
        loader={
          <div className='flex items-center justify-center py-16'>
            <div
              className='animate-spin inline-block w-7 h-7 border-[3px] border-current border-t-transparent text-gray-400 rounded-full'
              role='status'
              aria-label='loading'
            >
              <span className='sr-only'>Loading...</span>
            </div>
          </div>
        }
        endMessage={<p className='text-center py-9'>No more posts</p>}
      >
        {posts.map((post) => (
          <Post post={post} setPosts={setPosts} key={post._id} deletePost={deletePost} />
        ))}
      </InfiniteScroll>
    </main>
  );
}
