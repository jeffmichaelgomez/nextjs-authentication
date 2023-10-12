import {connect} from "@/dbConfig/dbConfig";
import GenProduct from '../../../models/genProductModel';  // Your product model
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {

    connect();

    const reqBody = await request.json();
    const { productId, brand, manufacturer, price, lotNo, expiry } = reqBody;

    try {
        // Check if product already exists with the given productId
        const existingProduct = await GenProduct.findOne({ productId });
        console.log('Product Still Available')

        if (existingProduct) {
            return NextResponse.json({ error: 'Product with this ID already exists.' }, { status: 400 });
        }
        // Create a new product
        const newProduct = new GenProduct({
            productId,
            brand,
            manufacturer,
            price,
            lotNo,
            expiry
        });

        await newProduct.save();

        return NextResponse.json({ success: true, message: 'Product added successfully', product: newProduct }, { status: 201 });

    } catch (error: any) {
        return NextResponse.json({ error: 'An error occurred while adding the product', details: error.message }, { status: 500 });
    }
}
