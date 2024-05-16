import { NextRequest, NextResponse } from 'next/server';

import connectMongo from '@/utils/mongodb';
import SupplierModel from '@/models/Supplier';

export async function GET() {
  try {
    await connectMongo();
    const suppliers = await SupplierModel.find();
    return NextResponse.json({ status: 'Success', data: suppliers });
  } catch (error) {
    console.error('Error in /api/suppliers (GET): ', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    await connectMongo();
    await SupplierModel.create(body);
    const suppliers = await SupplierModel.find();
    return NextResponse.json({ status: 'Success', data: suppliers });
  } catch (error) {
    console.error('Error in /api/suppliers (POST): ', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
