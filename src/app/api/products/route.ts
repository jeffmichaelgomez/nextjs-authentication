import { connect } from "@/dbConfig/dbConfig";
import GenProduct from '../../../models/genProductModel';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {

    connect();

    // Parsing page number from query parameters or defaulting to 1 if not available
    const page = parseInt(request.nextUrl.searchParams.get('page') || '1');
    const limit = 10;
    const skip = (page - 1) * limit;

    try {
        const products = await GenProduct.find().limit(limit).skip(skip).lean();

        return NextResponse.json({ success: true, products }, { status: 200 });
        
    } catch (error: any) {
        return NextResponse.json({ error: 'An error occurred while fetching products', details: error.message }, { status: 500 });
    }
}

export async function PUT(request: NextRequest) {
    await connect();

    const reqBody = await request.json();
    const { _id, ...updatedProductDetails } = reqBody;

    console.log(`PRODUCT_ID = ${_id}`);

    try {
        const updatedProduct = await GenProduct.findByIdAndUpdate(_id, updatedProductDetails, { new: true }).lean();

        return NextResponse.json({ success: true, product: updatedProduct });
    } catch (error: any) {
        return NextResponse.json({ error: 'An error occurred while updating product', details: error.message }, { status: 500 });
    }
}
