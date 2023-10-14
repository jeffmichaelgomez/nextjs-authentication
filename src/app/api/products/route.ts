import { connect } from "@/dbConfig/dbConfig";
import GenProduct from '../../../models/genProductModel';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
    connect();

    // Extract the search query parameter.
    const searchQuery = request.nextUrl.searchParams.get('search') || "";
    const page = parseInt(request.nextUrl.searchParams.get('page') || '1');
    const limit = 10;
    const skip = (page - 1) * limit;

    // Create a search filter based on the input.
    const searchFilter = {
      $or: [
        { productId: new RegExp(searchQuery, "i") },
        { brand: new RegExp(searchQuery, "i") },
        { manufacturer: new RegExp(searchQuery, "i") },
        { lotNo: new RegExp(searchQuery, "i") },
        // Convert expiry and price to string if you want to search them.
      ]
    };

    try {
        const products = await GenProduct.find(searchFilter).limit(limit).skip(skip).lean();

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
