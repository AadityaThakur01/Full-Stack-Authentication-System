import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/src/dbConfig/dbConfig";
import User from "@/src/models/userModel";
import { sendEmail } from "@/src/helper/mailer";

export async function POST(request: NextRequest) {
    try {
        await connect();
        const reqBody = await request.json();
        const { email } = reqBody;
        
        // check if user exists
        const user = await User.findOne({ email });
        
        if (!user) {
            return NextResponse.json({error: "User with this email does not exist"}, {status: 400});
        }

        // send reset password email
        await sendEmail({email, emailType: "RESET", userId: user._id});
        
        return NextResponse.json({
            message: "Password reset email sent successfully",
            success: true
        });
    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500});
    }
}
