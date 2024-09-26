import { RegisterationSchemaType } from "@/Type/type";
import mongoose, { Schema } from "mongoose";

const userSchema: Schema<RegisterationSchemaType> = new Schema(
    {
        username: {
            type: String,
            minlength: [3, "field length too short"],
            maxlength: [20, "field length too long"],
            required: [true, "lastname is required"],
            trim: true,
            lowercase: true,
        },
        email: {
            type: String,
            required: [true, "email is required"],
            unique: true,
            validate: {
                validator: function (value) {
                    return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{3,}$/.test(
                        value
                    );
                },
                message: (props) =>
                    `${props.value} is not a valid email address`,
            },
        },
        password: {
            type: String,
            minlength: [8, "password must be at least 8 characters long"],
            required: [true, "password is required"],
        },
        role: {
            type: String,
            enum: ["user", "admin"],
            default: "user",
        },
        isActive: {
            type: Boolean,
            default: false,
        },
        refreshToken: {
            type: String,
            default: undefined,
        },
    },
    { timestamps: true }
);

const User = (mongoose.models.users as mongoose.Model<RegisterationSchemaType>) || mongoose.model("users", userSchema)

export default User;