import { Post } from '@/types/posts';
import notify from '@/utils/notify';
import { useSession } from 'next-auth/react';
import React, { useState } from 'react';
import LikeListModal from './LikeListModal';

interface LikeProps {
  post: Post;
}
const likedStyles = 'fill-blue-500/70 hover:fill-blue-500/90 text-blue-500/70 hover:text-blue-500/90'
const unlikedStyles = 'fill-gray-500/30 hover:fill-gray-500/80 text-gray-500/30 hover:text-gray-500/80'

const Like: React.FC<LikeProps> = ({ post: _post }) => {
  const session = useSession();
  const [post, setPost] = useState(_post)
  const liked = post.likes.find(likeUser => likeUser._id === session.data?.user._doc._id);
  const [liking, setLiking] = useState(false);

  const toggleLike = async () => {
    if (!session.data) return;
    setLiking(true);

    try {
      const payload = {
        ...post,
        likes: liked ?
          _post.likes.filter(likeUser => likeUser._id != session.data.user._doc._id) :
          [...post.likes, session.data.user._doc]
      }

      const res = await fetch(`/api/posts/${post._id}`, {
        method: 'PUT',
        body: JSON.stringify(payload)
      })

      if (!res.ok) throw new Error('unable to like post');
      setPost(payload);
    } catch (e) {
      notify('Error', 'Failed to like post')
    } finally {
      setLiking(false);
    }
  }

  const displayLikeDesc = () => {
    if (post.likes?.length === 0) return '';
    const otherLikes = post.likes.filter(likeUser => likeUser._id != session.data?.user._doc._id)

    if (otherLikes.length < 1) {
      return `${liked ? 'You ' : ''} liked this`
    } else if (otherLikes.length === 1) {
      return `${liked ? 'You and ' : ''}${otherLikes[0].name} liked this`
    }

    return `${liked ? 'You ' : ''}${otherLikes.length} other people liked this`;
  }

  return (
    <div className='p-2 border-none'>
      <span className={`inline-flex gap-2 items-center ${liked ? likedStyles : unlikedStyles}`}>
        <button
          type='button'
          onClick={toggleLike}
          disabled={liking}
          className={'flex items-center gap-2'}>
          <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><path d="M313.4 32.9c26 5.2 42.9 30.5 37.7 56.5l-2.3 11.4c-5.3 26.7-15.1 52.1-28.8 75.2H464c26.5 0 48 21.5 48 48c0 18.5-10.5 34.6-25.9 42.6C497 275.4 504 288.9 504 304c0 23.4-16.8 42.9-38.9 47.1c4.4 7.3 6.9 15.8 6.9 24.9c0 21.3-13.9 39.4-33.1 45.6c.7 3.3 1.1 6.8 1.1 10.4c0 26.5-21.5 48-48 48H294.5c-19 0-37.5-5.6-53.3-16.1l-38.5-25.7C176 420.4 160 390.4 160 358.3V320 272 247.1c0-29.2 13.3-56.7 36-75l7.4-5.9c26.5-21.2 44.6-51 51.2-84.2l2.3-11.4c5.2-26 30.5-42.9 56.5-37.7zM32 192H96c17.7 0 32 14.3 32 32V448c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32V224c0-17.7 14.3-32 32-32z" /></svg>
        </button>
        {liking ?
          <div className="animate-spin inline-block w-2 h-2 border-[3px] border-current border-t-transparent text-gray-400 rounded-full" role="status" aria-label="loading">
            <span className="sr-only">Loading...</span>
          </div> :
          <button className='text-xs' type='button' data-hs-overlay={`#post-like-list-${post._id}`}>
            {displayLikeDesc()}
          </button>
        }
      </span>
      <LikeListModal
        postId={post._id}
        users={post.likes} />
    </div>
  )
}

export default Like