import { NextRequest, NextResponse } from 'next/server';

import connectMongo from '@/utils/mongodb';
import CategoryModel from '@/models/Category';

export async function GET() {
  try {
    await connectMongo();
    const categories = await CategoryModel.find();
    return NextResponse.json({ status: 'Success', data: categories });
  } catch (error) {
    console.error('Error in /api/categories (GET): ', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    await connectMongo();
    await CategoryModel.create(body);
    return NextResponse.json({ status: 'Success' });
  } catch (error) {
    console.error('Error in /api/categories (POST): ', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
