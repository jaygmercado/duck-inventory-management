import { NextRequest, NextResponse } from 'next/server';

import connectMongo from '@/utils/mongodb';
import PostModel from '@/models/Post';
import { Comment } from '@/types/posts';
import { joinAuthorAndCommenterInfo } from '@/app/api/posts/route';

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string; commentId: string } },
) {
  try {
    const { id, commentId } = params;

    await connectMongo();

    const postsFound = await PostModel.find({ _id: id });
    const post = postsFound[0];
    post.comments = post.comments.filter((comment: Comment) => {
      return comment._id.toString() !== commentId;
    });

    await post.save();

    // Apply aggregation to the updated post
    const aggregatedPost = await PostModel.aggregate([
      { $match: { _id: post._id } },
      ...joinAuthorAndCommenterInfo(),
    ]);

    return NextResponse.json({ status: 'Success', data: aggregatedPost[0] });

    return NextResponse.json({ status: 'Success', data: post });
  } catch (error) {
    console.error('Error in /api/users/[id] (DELETE): ', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
