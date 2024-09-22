import { TODOZODO } from "@/helper/zod"
import dbConnect from "@/lib/dbConnect"
import MyList from "@/models/myLists.model"
import Todo from "@/models/todo.mode"
import { TodoModelType } from "@/Type/type"
import GenerateColor from "@/utils/color"
import { convertIntoSeconds } from "@/utils/time"
import { NextRequest, NextResponse } from "next/server"

export const POST = async (req: NextRequest) => {
    await dbConnect("Add Todo")

    try {
        const { title, description, dateTime, duration, priority, listName } = await req.json() as TodoModelType

        const validate = TODOZODO.parse({ title, description, dateTime, duration, priority, listName })
        if (!validate) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Invalid data",
                    error: validate
                }, { status: 400 }
            )
        }

        const TagDetail = await MyList.findOne({ listName })
        const convertDuration = convertIntoSeconds(duration)
        let id: string = ""
        if (!TagDetail) {
            const color = GenerateColor()
            const newTag = await MyList.create({ listName, color: color })
            await MyList.findByIdAndUpdate({ _id: newTag?._id }, { $inc: { todos: 1 } })
            const newTodo = await Todo.create({ title, description, dateTime, duration: convertDuration, priority, listName: newTag._id })
            id = newTodo._id as string
        } else {
            const newTodo = await Todo.create({ title, description, dateTime, duration: convertDuration, priority, listName: TagDetail._id })
            await MyList.findOneAndUpdate({ listName }, { $inc: { todos: 1 } })
            id = newTodo._id as string
        }

        const findIfadded = await Todo.findById({ _id: id }).populate("listName")
        if (!findIfadded) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Failed to add todo",
                }, { status: 500 }
            )
        }

        return NextResponse.json(
            {
                sucess: true,
                message: "Todo add successfully",
                data: findIfadded
            }, { status: 201 }
        )
    } catch (error: unknown) {
        console.error((error as Error).message)
        return NextResponse.json(
            {
                success: false,
                message: "Something went wrong",
                error: (error as Error).message
            }, { status: 500 }
        )
    }
}