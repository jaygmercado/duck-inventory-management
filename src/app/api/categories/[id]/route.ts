import { NextRequest, NextResponse } from 'next/server';

import connectMongo from '@/utils/mongodb';
import CategoryModel from '@/models/Category';

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectMongo();
    const category = await CategoryModel.findOne({ _id: params.id });
    return NextResponse.json({ status: 'Success', data: category });
  } catch (error) {
    console.error('Error in /api/categories/[id] (GET): ', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await req.json();
    await connectMongo();
    const res = await CategoryModel.findOneAndUpdate({ _id: params.id }, body, { new: true });
    return NextResponse.json({ status: 'Success', data: res });
  } catch (error) {
    console.error('Error in /api/categories/[id] (PUT): ', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectMongo();
    const deleteCategory = await CategoryModel.findByIdAndDelete(params.id);
    return NextResponse.json({ status: 'Success', data: deleteCategory });
  } catch (error) {
    console.error('Error in /api/categories/[id] (DELETE): ', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
