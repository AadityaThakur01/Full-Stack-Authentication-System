import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { connect } from "@/src/dbConfig/dbConfig";
import User from "@/src/models/userModel";
import jwt from "jsonwebtoken";

export async function POST(request: NextRequest) {
    try {
        await connect();
        
        const reqBody = await request.json()
        const { email, password } = reqBody;

        // check if user existed

        const user = await User.findOne({ email })
        if (!user) {
            return NextResponse.json({error : "User does not exist"},{status : 440})
        }

        // check is password is correct
        const validPassword = await bcryptjs.compare(password, user.password)
        if (!validPassword) {
            return NextResponse.json({error : "Password is incorrect"},{status : 400})
        }
        
        // create token data
        const tokenData = {
            id: user._id,
            uesrname: user.username,
            email: user.email
        }
        // create token
        const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!,
            {expiresIn : "1d"})
        
        const response = NextResponse.json({
            message: "Login Successful",
            success: true,
        })
        response.cookies.set("token", token, {
            httpOnly: true,
            
        })
        return response;

    } catch (error: any) {
        return NextResponse.json({error : error.message},{status : 550})
        
    }
}