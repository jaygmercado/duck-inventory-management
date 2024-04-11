import { Schema, model, models } from 'mongoose';

const postSchema = new Schema({
  content: {
    type: String,
    default: '',
  },
  created: {
    type: Date,
    default: Date.now,
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  likes: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User',
    }
  ],
  comments: [
    {
      commenter: {
        type: Schema.Types.ObjectId,
        default: null,
        ref: 'User',
      },
      content: {
        type: String,
        default: '',
      },
      created: {
        type: Date,
        default: Date.now,
      },
    },
  ],
});

const PostModel = models['post'] || model('post', postSchema);

export default PostModel;
