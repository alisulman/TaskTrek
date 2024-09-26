import User from "@/models/user.model";
import jwt from "jsonwebtoken";
import { JwtPayload, RegisterationSchemaFullType, RegisterationSchemaType } from "@/Type/type";

const GenerateAcessToken = (user: RegisterationSchemaType) => {
    return jwt.sign(
        {
            id: user._id,
            email: user.email,
            role: user.role,
        },
        process.env.JWT_ACCESS_TOKEN_SECRET as string,
        { expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRY }
    );
};

const GenerateRefreshToken = (user: RegisterationSchemaFullType) => {
    return jwt.sign(
        {
            id: user._id,
        },
        process.env.JWT_REFRESH_TOKEN_SECRET as string,
        { expiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRY }
    );
};

export const VerifyAccessToken = (token: string) => {
    return jwt.verify(token, process.env.JWT_ACCESS_TOKEN_SECRET as string);
};

export const VerifyRefreshToken = (token: string): JwtPayload => {
    return jwt.verify(token, process.env.JWT_REFRESH_TOKEN_SECRET as string) as JwtPayload
};

const GenerateAcessandRefreshToken = async (userId: string) => {
    try {
        const user: RegisterationSchemaFullType = await User.findById(userId) as RegisterationSchemaFullType;
        const AccessToken = GenerateAcessToken(user);
        const RefreshToken = GenerateRefreshToken(user);

        user.refreshToken = RefreshToken;
        await user .save({ validateBeforeSave: false });

        return { AccessToken, RefreshToken };
    } catch (error: unknown) {
        console.log((error as Error).message);
    };
}

export default GenerateAcessandRefreshToken;