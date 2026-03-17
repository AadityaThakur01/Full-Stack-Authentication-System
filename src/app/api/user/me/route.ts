import { getDataFromToken } from "@/src/helper/getDataFromToken";

import { NextRequest, NextResponse } from "next/server";
import User from "@/src/models/userModel"
import { connect } from "@/src/dbConfig/dbConfig"

export async function GET(request: NextRequest) {
    await connect();
    try {
        const userId = await getDataFromToken(request);
        const user = await User.findOne({ _id: userId }).select("-password");
        return NextResponse.json({
            message: "User Found",
            data : user
        })
    } catch (error:any) {
        return NextResponse.json({error: error.message},{status : 400})
    }
}