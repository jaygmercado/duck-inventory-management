import { NextRequest, NextResponse } from 'next/server';

import connectMongo from '@/utils/mongodb';
import SupplierModel from '@/models/Supplier';

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectMongo();
    const supplier = await SupplierModel.findOne({ _id: params.id });
    return NextResponse.json({ status: 'Success', data: supplier });
  } catch (error) {
    console.error('Error in /api/suppliers/[id] (GET): ', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await req.json();
    await connectMongo();
    const res = await SupplierModel.findOneAndUpdate({ _id: params.id }, body, { new: true });
    return NextResponse.json({ status: 'Success', data: res });
  } catch (error) {
    console.error('Error in /api/suppliers/[id] (PUT): ', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectMongo();
    const deletedSupplier = await SupplierModel.findByIdAndDelete(params.id);
    return NextResponse.json({ status: 'Success', data: deletedSupplier });
  } catch (error) {
    console.error('Error in /api/suppliers/[id] (DELETE): ', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
