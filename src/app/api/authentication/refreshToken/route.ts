import GenerateAcessandRefreshToken, { VerifyRefreshToken } from "@/helper/generateTokens";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/user.model";
import { JwtPayload } from "@/Type/type";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
    await dbConnect("refreshToken");

    try {
        const refreshsavedToken = req.cookies.get("rt");
        if (!refreshsavedToken) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Refresh token is missing in cookies",
                },
                { status: 400 }
            );
        }

        // Verify refresh token
        const decodeToken: JwtPayload = VerifyRefreshToken(refreshsavedToken.value);
        if (!decodeToken || !decodeToken.id) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Invalid or expired refresh token",
                },
                { status: 401 }
            );
        }

        // Find the user by decoded token ID
        const user = await User.findById(decodeToken.id).select("-password -refreshToken");
        if (!user) {
            return NextResponse.json(
                {
                    success: false,
                    message: "User not found",
                },
                { status: 404 }
            );
        }

        // Generate new access and refresh tokens
        const tokens = await GenerateAcessandRefreshToken(user._id as string);

        // Get the updated user information
        const loggedInUser = await User.findById(user._id).select("-password -refreshToken");

        const response = NextResponse.json(
            {
                success: true,
                message: "Tokens refreshed successfully",
                user: loggedInUser,
                tokens
            },
            { status: 200 }
        );

        // Set the new Access Token as an HttpOnly cookie (client cannot access it)
        response.cookies.set("at", tokens?.AccessToken as string, {
            maxAge: 60 * 60 * 24, // 1 day for access token
            path: "/",
            httpOnly: true, // Make it HttpOnly (accessible only on the server side)
            secure: true, // Secure cookie for HTTPS
            sameSite: "strict", // Strict cookie policy
        });

        // Set the new Refresh Token as an HttpOnly cookie (for server-side only)
        response.cookies.set("rt", tokens?.RefreshToken as string, {
            maxAge: 60 * 60 * 24 * 30, // 30 days for refresh token
            path: "/",
            httpOnly: true, // Make it HttpOnly (secure against XSS)
            secure: true, // Secure cookie for HTTPS
            sameSite: "strict", // Strict cookie policy
        });

        return response;
    } catch (error: unknown) {
        console.error(`Error: ${(error as Error).message}`);
        return NextResponse.json(
            {
                success: false,
                message: "Something went wrong during token refresh",
                error: (error as Error).message,
            },
            { status: 500 }
        );
    }
};
