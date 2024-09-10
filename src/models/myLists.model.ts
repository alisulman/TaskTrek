import { ListModalType } from "@/Type/type";
import mongoose from "mongoose";
import { Schema } from "mongoose";

const myListSchema: Schema<ListModalType> = new Schema({
    listName: {
        type: String,
        required: [true, "Please fill required field"],
        unique: true,
        trim: true
    },
    color: {
        type: String,
        default: ""
    },
    listType: {
        type: String,
        enum: ["default", "temporary"],
        default: "temporary"
    },
    todos: {
        type: Number,
        default: 0
    }
}, { timestamps: true })

const MyList = (mongoose.models.lists as mongoose.Model<ListModalType>) || mongoose.model("lists", myListSchema)

export default MyList;