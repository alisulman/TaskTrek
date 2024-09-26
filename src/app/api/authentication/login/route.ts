import GenerateAcessandRefreshToken from "@/helper/generateTokens";
import { VerifyPassword } from "@/helper/passsword";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/user.model";
import { RegisterationType } from "@/Type/type";
import EmptyFields from "@/utils/emptyFields";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
    await dbConnect("Login");

    try {
        const body: RegisterationType = await req.json();
        const { email, password } = body;

        // Check for empty fields
        const emptyfields = EmptyFields(body);
        if (emptyfields.length > 0) {
            return NextResponse.json(
                {
                    success: false,
                    message: `${emptyfields.join(", ")} required`,
                }, { status: 400 }
            );
        }

        // Check if user exists
        const userExist = await User.findOne({ email });
        if (!userExist) {
            return NextResponse.json(
                {
                    success: false,
                    message: `Email does not exist`,
                }, { status: 404 } // Changed to 404
            );
        }

        // Verify password
        const checkPassword = await VerifyPassword(password, userExist.password);
        if (!checkPassword) {
            return NextResponse.json(
                {
                    success: false,
                    message: `Email or password is incorrect`,
                }, { status: 401 } // Changed to 401
            );
        }

        // Generate tokens
        const tokens = await GenerateAcessandRefreshToken(userExist._id as string);

        // Fetch user details excluding sensitive fields
        const loggedInUser = await User.findById(userExist._id).select("-password -refreshToken");

        // Prepare response
        const response = NextResponse.json(
            {
                success: true,
                message: "Login successfully",
                user: loggedInUser,
                tokens
            }, { status: 200 } // Changed to 200
        );

        // Set Access Token as an HttpOnly cookie
        response.cookies.set("at", tokens?.AccessToken as string, {
            maxAge: 60 * 60 * 24, // 1 day for access token
            path: "/",
            httpOnly: true, // Secure cookie accessible only on the server side
            secure: true,
            sameSite: "strict",
        });

        // Set Refresh Token as an HttpOnly cookie
        response.cookies.set("rt", tokens?.RefreshToken as string, {
            maxAge: 60 * 60 * 24 * 30, // 30 days for refresh token
            path: "/",
            httpOnly: false, // Secure cookie accessible only on the server side
            secure: true,
            sameSite: "strict",
        });

        return response;
    } catch (error: unknown) {
        console.error(`${(error as Error).message}`.bgRed);
        return NextResponse.json(
            {
                success: false,
                message: "Something went wrong",
                error: (error as Error).message,
            }, { status: 500 } // Return error response
        );
    }
};
