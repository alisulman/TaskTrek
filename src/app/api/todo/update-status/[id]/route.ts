import dbConnect from "@/lib/dbConnect";
import MyList from "@/models/myLists.model";
import Todo from "@/models/todo.mode";
import { NextRequest, NextResponse } from "next/server";

export const PUT = async (
    req: NextRequest,
    { params }: { params: { id: string } }
) => {
    dbConnect("update status compelete")

    try {
        const { id } = params
        if (!id) {
            return NextResponse.json(
                {
                    success: false,
                    message: "ID is required.",
                },
                { status: 400 }
            );
        }

        const udpateCompleteStatus = await Todo.findByIdAndUpdate(
            { _id: id },
            { completed: true },
            { new: true }
        )
        await MyList.findByIdAndUpdate(
            {_id: udpateCompleteStatus?.listName},
            {$inc: {todos: -1}},
            {new: true}
        )

        const findIfUpdated = await Todo.findOne(
            { _id: udpateCompleteStatus?._id, completed: true }
        ).populate("listName")
        if (!findIfUpdated) {
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
                data: findIfUpdated
            }, { status: 200 }
        )
    } catch (error: any) {
        console.error(error.message);
        return NextResponse.json(
            {
                success: false,
                message: "Something went wrong.",
            },
            { status: 500 }
        );
    }
}