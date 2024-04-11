import React, { useState, Dispatch, SetStateAction } from 'react';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { TiDelete } from 'react-icons/ti';
import { Comment as CommentType, Post as PostType } from '@/types/posts';
import notify from '@/utils/notify';
import Like from './Like';

export const Comment: React.FC<{
  comment: CommentType;
  userId: string;
  // eslint-disable-next-line no-unused-vars
  deleteComment: (commentId: string) => void;
}> = ({ comment, userId, deleteComment }) => {
  const [deleteing, setDeleteing] = useState(false);

  return (
    <div className='border-none flex items-center justify-between mb-2'>
      <div className='flex items-center'>
        <Image
          src={comment.commenterInfo.image}
          alt="User's Profile"
          width={30}
          height={30}
          className='rounded-full inline my-1'
        />
        <div className='py-0 my-0 pl-3'>
          <span className='py-0 my-0 text-xs leading-none'>{comment.commenterInfo.name}</span>
          <p className='py-0 my-0 text-xs text-gray-400 leading-none'>
            {new Date(comment.created).toDateString()}
          </p>
        </div>
        <div className='py-0 my-0 pl-3'> - {comment.content}</div>
      </div>
      {comment.commenterInfo._id === userId && (
        <>
          {deleteing ?
            <div className="animate-spin self-start inline-block w-4 h-4 border-[3px] border-current border-t-transparent text-gray-400 rounded-full" role="status" aria-label="loading">
              <span className="sr-only">Loading...</span>
            </div> :
            <TiDelete
              size='1rem'
              className='self-start opacity-20 hover:opacity-100 transform scale-110 hover:scale-125 cursor-pointer'
              onClick={() => {
                deleteComment(comment._id);
                setDeleteing(true);
              }}
            />
          }
        </>
      )}
    </div>
  );
};

export const Post: React.FC<{
  post: PostType;
  setPosts: Dispatch<SetStateAction<PostType[]>>;
  // eslint-disable-next-line no-unused-vars
  deletePost: (postId: string) => void;
}> = ({ post, setPosts, deletePost }) => {
  const session = useSession();
  const [commentContent, setCommentContent] = useState('');
  const [deleteing, setDeleteing] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const addComment = async () => {
    try {
      setSubmitting(true);
      const res = await fetch(`/api/posts/${post._id}/comments`, {
        method: 'POST',
        body: JSON.stringify({ content: commentContent, author: session.data?.user._doc._id }),
      });
      if (!res.ok) throw new Error('Failed to add comment');
      const resJSON = await res.json();
      setPosts((currPosts) =>
        currPosts.map((currPost) => {
          if (currPost._id === post._id) {
            return resJSON.data;
          }

          return currPost;
        }),
      );
      setCommentContent('');
      notify('Success', 'Comment added');
    } catch {
      notify('Error', 'Unable to add comment');
    } finally {
      setSubmitting(false);
    }
  };

  const deleteComment = async (commentId: string) => {
    try {
      const res = await fetch(`/api/posts/${post._id}/comments/${commentId}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete comment');
      setPosts((currPosts) =>
        currPosts.map((currPost) => {
          if (currPost._id === post._id) {
            return {
              ...currPost,
              comments: currPost.comments.filter(commentItem => commentItem._id != commentId)
            }
          }

          return currPost;
        }),
      );
      notify('Success', 'Comment deleted');
    } catch {
      notify('Error', 'Unable to delete post');
    }
  };

  return (
    <div className='flex flex-col mt-4' key={post._id}>
      <div className='-m-1.5 overflow-x-auto'>
        <div className='p-1.5 min-w-full inline-block align-middle relative'>
          <div className='border shadow rounded-lg divide-y divide-gray-200 dark:border-gray-700 dark:divide-gray-700 p-4 relative'>
            <div className='border-none flex items-center justify-between'>
              <div className='flex items-center'>
                <Image
                  src={post.authorInfo.image}
                  alt="User's Profile"
                  width={40}
                  height={40}
                  className='rounded-full inline my-1'
                />
                <div className='py-0 my-0 pl-3'>
                  <span className='py-0 my-0 text-sm leading-none'>{post.authorInfo.name}</span>
                  <p className='py-0 my-0 text-xs text-gray-400 leading-none'>
                    {new Date(post.created).toDateString()}
                  </p>
                </div>
              </div>
              {post.authorInfo._id === session.data?.user._doc._id && !submitting && (
                <>
                  {deleteing ?
                    <div className="animate-spin self-start inline-block w-4 h-4 border-[3px] border-current border-t-transparent text-gray-400 rounded-full" role="status" aria-label="loading">
                      <span className="sr-only">Loading...</span>
                    </div> :
                    <TiDelete
                      size='1.5rem'
                      className='self-start opacity-20 hover:opacity-100 transform scale-110 hover:scale-125 cursor-pointer'
                      onClick={() => {
                        deletePost(post._id);
                        setDeleteing(true);
                      }}
                    />
                  }
                </>
              )}
            </div>

            <p className='py-4 border-none'>{post.content}</p>

            <Like post={post} />
            <hr className='mb-5' />
            {post.comments.length > 0 &&
              post.comments.map((comment) => (
                <Comment
                  comment={comment}
                  userId={session.data?.user._doc._id}
                  deleteComment={deleteComment}
                  key={comment._id}
                />
              ))}
            <form className='border-none'>
              <textarea
                className='py-3 px-4 block w-full border border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400'
                rows={1}
                placeholder='Write a comment'
                value={commentContent}
                disabled={deleteing || submitting}
                onChange={(e) => setCommentContent(e.target.value)}
              />
              {commentContent !== '' && (
                <div className='flex justify-end'>
                  <button
                    type='button'
                    disabled={deleteing || submitting}
                    className='mt-1 disabled:cursor-not-allowed disabled:border-gray-200 disabled:text-gray-500 disabled:ring-gray-200 disabled:hover:bg-gray-200 py-1 px-4 inline-flexgap-2 rounded-md border-2 border-green-200 font-semibold text-green-500 hover:text-white hover:bg-green-500 hover:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800 '
                    onClick={addComment}
                  >
                    {submitting ?
                      <div className="animate-spin inline-block w-4 h-4 border-[3px] border-current border-t-transparent text-gray-400 rounded-full" role="status" aria-label="loading">
                        <span className="sr-only">Loading...</span>
                      </div> :
                      'Save'
                    }
                  </button>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
