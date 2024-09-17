import dbConnect from "@/lib/dbConnect";
import MyList from "@/models/myLists.model";
import { NextRequest, NextResponse } from "next/server";

export const DELETE = async (
    req: NextRequest,
    { params }: { params: { id: string } }
) => {
    await dbConnect("Delete List");

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
        const findByIdList = await MyList.findOne({ _id: id, listType: "temporary" });
        if (!findByIdList) {
            return NextResponse.json(
                {
                    success: false,
                    message: "List not found.",
                },
                { status: 404 }
            );
        }

        const deleteListById = await MyList.findByIdAndDelete(findByIdList._id);

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
