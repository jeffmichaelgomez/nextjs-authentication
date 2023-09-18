import {connect} from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import { sendEmail } from "@/helpers/mailer";
import User from "@/models/userModel";

connect();

export async function POST(request: NextRequest){
    try{
        const {email} = await request.json()
        const user = await User.findOne({email: email});
        if (!user) {
          throw new Error('No user found with that email.');
        }
       
       //send verification email
       await sendEmail({email, emailType: "RESET", userId: user._id})
       return NextResponse.json({
        message: "Link created successfully!",
        success: true,
        }, {status:201})

    }catch (error: any){
        return NextResponse.json({error: error.message},
        {status: 500})
    }
}