import { NextRequest, NextResponse } from 'next/server';
import mongoose from 'mongoose';
import connectMongo from '@/utils/mongodb';
import PostModel from '@/models/Post';

export const joinAuthorAndCommenterInfo = () => [
  {
    $lookup: {
      from: 'users',
      foreignField: '_id',
      localField: 'likes',
      as: 'likes'
    }
  },
  {
    $lookup: {
      from: 'users',
      localField: 'author',
      foreignField: '_id',
      as: 'authorInfo',
    },
  },
  {
    $unwind: {
      path: '$authorInfo',
      preserveNullAndEmptyArrays: true,
    },
  },
  {
    $unwind: {
      path: '$comments',
      preserveNullAndEmptyArrays: true,
    },
  },
  {
    $lookup: {
      from: 'users',
      localField: 'comments.commenter',
      foreignField: '_id',
      as: 'comments.commenterInfo',
    },
  },
  {
    $unwind: {
      path: '$comments.commenterInfo',
      preserveNullAndEmptyArrays: true,
    },
  },
  {
    $group: {
      _id: '$_id',
      content: { $first: '$content' },
      created: { $first: '$created' },
      author: { $first: '$author' },
      likes: { $first: '$likes' },
      comments: { $push: '$comments' },
      authorInfo: { $first: '$authorInfo' },
    },
  },
  {
    $addFields: {
      comments: {
        $cond: {
          if: { $eq: ['$comments', [{}]] },
          then: [],
          else: '$comments',
        },
      },
      likes: {
        $cond: {
          if: { $eq: ['$likes', [{}]] },
          then: [],
          else: '$likes',
        },
      },
    },
  },
];

export async function GET(req: NextRequest) {
  try {
    await connectMongo();

    const url = new URL(req.url);
    const page = parseInt(url.searchParams.get('page') ?? '1', 10) || 1;
    const postsPerPage = 3;

    const skip = (page - 1) * postsPerPage;
    const posts = await PostModel.aggregate([
      ...joinAuthorAndCommenterInfo(),
      {
        $sort: {
          created: -1,
        },
      },
      {
        $skip: skip,
      },
      {
        $limit: postsPerPage,
      },
    ]);

    return NextResponse.json({ status: 'Success', data: posts });
  } catch (error) {
    console.error('Error in /api/posts (GET): ', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { content, author } = body;
    await connectMongo();
    const { _id } = await PostModel.create({ content, author });
    const newPost = await PostModel.aggregate([
      {
        $match: {
          _id: new mongoose.Types.ObjectId(_id),
        },
      },
      ...joinAuthorAndCommenterInfo(),
    ]);
    return NextResponse.json({ status: 'Success', data: newPost[0] });
  } catch (error) {
    console.error('Error in /api/posts (POST): ', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
