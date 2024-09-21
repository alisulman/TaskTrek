import dbConnect from "@/lib/dbConnect";
import MyList from "@/models/myLists.model";
import Todo from "@/models/todo.mode";
import { NextRequest, NextResponse } from "next/server";

export const DELETE = async (
    req: NextRequest,
    { params }: { params: { id: string } }
) => {
    await dbConnect("Delete Todo");

    const { id } = params;

    if (!id) {
        return NextResponse.json(
            {
                success: false,
                message: "ID is required.",
            },
            { status: 400 }
        );
    }

    try {
        const findByIdTodo = await Todo.findById({ _id: id });

        if (!findByIdTodo) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Todo not found.",
                },
                { status: 404 }
            );
        }
        const deleteListById = await Todo.findByIdAndDelete(findByIdTodo._id);
        await MyList.findByIdAndUpdate(
            {id: findByIdTodo.listName},
            {$inc: {todos: -1}},
            {new: true}
        )

        return NextResponse.json(
            {
                success: true,
                message: "Task deleted successfully.",
                data: deleteListById,
            },
            { status: 200 }
        );

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