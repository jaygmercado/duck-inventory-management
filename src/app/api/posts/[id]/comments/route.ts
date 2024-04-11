import { NextRequest, NextResponse } from 'next/server';
import connectMongo from '@/utils/mongodb';
import PostModel from '@/models/Post';
import { joinAuthorAndCommenterInfo } from '@/app/api/posts/route';

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await req.json();
    const { content, author } = body;
    const postId = params.id;

    await connectMongo();

    const updatedPost = await PostModel.findByIdAndUpdate(
      postId,
      {
        $push: {
          comments: {
            commenter: author,
            content,
          },
        },
      },
      { new: true },
    );

    // Apply aggregation to the updated post
    const aggregatedPost = await PostModel.aggregate([
      { $match: { _id: updatedPost._id } },
      ...joinAuthorAndCommenterInfo(),
    ]);

    return NextResponse.json({ status: 'Success', data: aggregatedPost[0] });
  } catch (error) {
    console.error('Error in /api/posts/[id]/comments (POST): ', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
