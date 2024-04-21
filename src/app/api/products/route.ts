import { NextRequest, NextResponse } from 'next/server';

import connectMongo from '@/utils/mongodb';
import ProductModel from '@/models/Product';

export async function GET() {
  try {
    await connectMongo();
    const products = await ProductModel.find();
    return NextResponse.json({ status: 'Success', data: products });
  } catch (error) {
    console.error('Error in /api/products (GET): ', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    await connectMongo();
    await ProductModel.create(body);
    return NextResponse.json({ status: 'Success' });
  } catch (error) {
    console.error('Error in /api/products (POST): ', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
