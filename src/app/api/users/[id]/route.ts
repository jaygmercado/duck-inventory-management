import { NextRequest, NextResponse } from 'next/server';

import connectMongo from '@/utils/mongodb';
import UserModel from '@/models/User';

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectMongo();
    const user = await UserModel.findOne({ _id: params.id });
    return NextResponse.json({ status: 'Success', data: user });
  } catch (error) {
    console.error('Error in /api/users/[id] (GET): ', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await req.json();
    await connectMongo();
    const res = await UserModel.findOneAndUpdate({ _id: params.id }, body, { new: true });
    return NextResponse.json({ status: 'Success', data: res });
  } catch (error) {
    console.error('Error in /api/users/[id] (PUT): ', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectMongo();
    const deletedUser = await UserModel.findByIdAndDelete(params.id);
    return NextResponse.json({ status: 'Success', data: deletedUser });
  } catch (error) {
    console.error('Error in /api/users/[id] (DELETE): ', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
