import { NextRequest, NextResponse } from 'next/server';

import connectMongo from '@/utils/mongodb';
import UserModel from '@/models/User';

export async function GET() {
  try {
    await connectMongo();
    const users = await UserModel.find();
    return NextResponse.json({ status: 'Success', data: users });
  } catch (error) {
    console.error('Error in /api/users (GET): ', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    await connectMongo();
    await UserModel.create(body);
    return NextResponse.json({ status: 'Success' });
  } catch (error) {
    console.error('Error in /api/users (POST): ', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
