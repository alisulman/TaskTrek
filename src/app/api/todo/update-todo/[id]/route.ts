import dbConnect from "@/lib/dbConnect"
import MyList from "@/models/myLists.model"
import Todo from "@/models/todo.mode"
import { TodoModelType } from "@/Type/type"
import { convertIntoSeconds } from "@/utils/time"
import { NextRequest, NextResponse } from "next/server"

export const PUT = async (
    req: NextRequest,
    { params }: { params: { id: string } }
) => {
    await dbConnect("Update Todo")

    const { id } = params
    const { title, description, dateTime, duration, priority } = await req.json() as TodoModelType
    
    try {
        if (!id) {
            return NextResponse.json(
                {
                    success: false,
                    message: "ID is required.",
                },
                { status: 400 }
            );
        }

        const findData = await Todo.findById({ _id: id })
        if (!findData) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Todo not found.",
                }, { status: 404 }
            )
        }

        const findList = await MyList.findById({ _id: findData?.listName })
        const convertDuration = convertIntoSeconds(duration)
        const updateListById = await Todo.findByIdAndUpdate(
            { _id: id },
            {
                title,
                description,
                dateTime,
                duration: convertDuration,
                priority,
                listName: findList?._id
            },
            { new: true, runValidators: true }
        )

        const findDataAgain = await Todo.findById({ _id: updateListById?._id }).populate("listName")

        if (!findDataAgain) {
            return NextResponse.json(
                {
                    success: false,
                    message: "List not updated successfully. Try Again",
                }, { status: 400 }
            )
        }

        return NextResponse.json(
            {
                success: true,
                message: "List updated successfully",
                data: findDataAgain
            }, { status: 200 }
        )
    } catch (error: any) {
        console.log(error.message)
        return NextResponse.json(
            {
                success: false,
                message: "Something went wrong",
                error: error.message
            }, { status: 500 }
        )
    }
}