import dbConnect from "@/lib/dbConnect"
import Todo from "@/models/todo.mode"
import { TodoModelSchemaType } from "@/Type/type"
import { NextResponse } from "next/server"

export const GET = async () => {
    await dbConnect("Fetch All todos")

    try {
        const fetchAllDataFromDatabase: TodoModelSchemaType[] = await Todo.find().populate("listName")
        if (fetchAllDataFromDatabase.length > 0) {
            return NextResponse.json(
                {
                    success: true,
                    message: `There are ${fetchAllDataFromDatabase.length} todos in database`,
                    data: fetchAllDataFromDatabase
                }, { status: 200 }
            )
        } else {
            return NextResponse.json(
                {
                    success: false,
                    message: "No lists found in database"
                }, { status: 404 }
            )
        }
    } catch (error: unknown) {
        console.error(error)
        return NextResponse.json(
            {
                success: false,
                message: "Something went wrong",
                error: (error as Error).message
            }, { status: 500 }
        )
    }
}
