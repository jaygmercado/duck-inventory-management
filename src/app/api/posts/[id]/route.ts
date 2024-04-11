import { NextRequest, NextResponse } from 'next/server';

import connectMongo from '@/utils/mongodb';
import PostModel from '@/models/Post';

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectMongo();
    const post = await PostModel.findOne({ _id: params.id });
    return NextResponse.json({ status: 'Success', data: post });
  } catch (error) {
    console.error('Error in /api/posts/[id] (GET): ', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await req.json();
    await connectMongo();
    const res = await PostModel.findOneAndUpdate({ _id: params.id }, body, { new: true });
    return NextResponse.json({ status: 'Success', data: res });
  } catch (error) {
    console.error('Error in /api/posts/[id] (PUT): ', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectMongo();
    const deletedUser = await PostModel.findByIdAndDelete(params.id);
    return NextResponse.json({ status: 'Success', data: deletedUser });
  } catch (error) {
    console.error('Error in /api/posts/[id] (DELETE): ', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
