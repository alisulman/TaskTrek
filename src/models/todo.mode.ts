import { TodoModelSchemaType } from "@/Type/type";
import mongoose from "mongoose";
import { Schema } from "mongoose";

const todoSchema: Schema<TodoModelSchemaType> = new Schema({
    title: {
        type: String,
        required: [true, "Please fill required field"],
        trim: true
    },
    description: {
        type: String,
        required: [true, "Please fill required field"],
        trim: true
    },
    dateTime: {
        type: String,
        required: [true, "Please fill required field"]
    },
    duration: {
        type: String,
        required: [true, "Please fill required field"]
    },
    priority: {
        type: String,
        enum: ["low", "medium", "high"],
        required: [true, "Please fill required field"]
    },
    completed: {
        type: Boolean,
        default: false
    },
    listName: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "lists"
    }
})

const Todo = (mongoose.models.todos as mongoose.Model<TodoModelSchemaType>) || mongoose.model("todos", todoSchema)

export default Todo;