import GenerateAcessandRefreshToken from "@/helper/generateTokens";
import { EncodePassword } from "@/helper/passsword";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/user.model";
import { RegisterationType } from "@/Type/type";
import EmptyFields from "@/utils/emptyFields";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest,) => {
    await dbConnect("Signup");

    try {
        // Parse the request body once and reuse it
        const body: RegisterationType = await req.json();
        const { username, email, password } = body;

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

        // Check if the user already exists
        const userExist = await User.findOne({ email });
        if (userExist) {
            return NextResponse.json(
                {
                    success: false,
                    message: `email already exists`,
                }, { status: 409 }
            );
        }

        // Encode the password
        const encodedpassword = await EncodePassword(password);

        // Create the new user
        const newUser = await User.create({
            username,
            email,
            password: encodedpassword,
        });

        // Select the user without password and refreshToken fields
        const userCreated = await User.findById(newUser._id).select(
            "-password -refreshToken"
        );
        if (!userCreated) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Internal server Error",
                }, { status: 500 }
            );
        }

        // Generate tokens
        const tokens = await GenerateAcessandRefreshToken(userCreated?._id as string);

        // Successful response
        const response = NextResponse.json(
            {
                success: true,
                message: "Registeration successfully",
                user: userCreated,
                tokens
            }, { status: 201 }
        );


        response.cookies.set({
            name: "at",
            value: tokens?.AccessToken as string,
            maxAge: 60 * 60 * 24,
            path: "/",
            httpOnly: true,
            secure: true,
            sameSite: "strict",
        });

        response.cookies.set({
            name: "rt",
            value: tokens?.RefreshToken as string,
            maxAge: 60 * 60 * 24 * 30,
            path: "/",
            httpOnly: false,
            secure: true,
            sameSite: "strict",
        });

        return response
    } catch (error: unknown) {
        console.log(`${(error as Error).message}`);
        return NextResponse.json(
            {
                success: false,
                message: "Something went wrong",
                error: (error as Error).message
            }, { status: 500 }
        );
    }
};
