import { NextRequest, NextResponse } from 'next/server';

import connectMongo from '@/utils/mongodb';
import ProductModel from '@/models/Product';

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectMongo();
    const product = await ProductModel.findOne({ _id: params.id });
    return NextResponse.json({ status: 'Success', data: product });
  } catch (error) {
    console.error('Error in /api/products/[id] (GET): ', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await req.json();
    await connectMongo();
    const res = await ProductModel.findOneAndUpdate({ _id: params.id }, body, { new: true });
    return NextResponse.json({ status: 'Success', data: res });
  } catch (error) {
    console.error('Error in /api/products/[id] (PUT): ', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectMongo();
    const deletedUser = await ProductModel.findByIdAndDelete(params.id);
    return NextResponse.json({ status: 'Success', data: deletedUser });
  } catch (error) {
    console.error('Error in /api/products/[id] (DELETE): ', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
