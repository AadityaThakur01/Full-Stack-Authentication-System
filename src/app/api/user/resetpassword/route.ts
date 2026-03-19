import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/src/dbConfig/dbConfig";
import User from "@/src/models/userModel";
import bcryptjs from "bcryptjs";

export async function POST(request: NextRequest) {
    try {
        await connect();
        const reqBody = await request.json()
        const { token, newPassword } = reqBody
        
        const user = await User.findOne({
            forgotPasswordToken: token,
            forgotPasswordTokenExpiry: {$gt: Date.now()}
        })

        if (!user) {
            return NextResponse.json({error: "Invalid or expired token"}, {status: 400})
        }

        // hash the new password
        const salt = await bcryptjs.genSalt(10)
        const hashedPassword = await bcryptjs.hash(newPassword, salt)

        // update the user's password and clear the tokens
        user.password = hashedPassword;
        user.forgotPasswordToken = undefined;
        user.forgotPasswordTokenExpiry = undefined;

        await user.save();

        return NextResponse.json({
            message: "Password reset successfully",
            success: true
        })

    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500})
    }
}
