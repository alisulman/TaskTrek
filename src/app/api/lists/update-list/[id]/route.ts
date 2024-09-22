import dbConnect from "@/lib/dbConnect"
import MyList from "@/models/myLists.model"
import { NextRequest, NextResponse } from "next/server"

export const PUT = async (
    req: NextRequest,
    { params }: { params: { id: string } }
) => {
    await dbConnect("Update List")

    const { id } = params
    const { name } = await req.json() as { name: string }
    
    try {
        const findData = await MyList.findOne({_id: id, listType: "temporary"})
        const updateListById = findData ? await MyList.findOneAndUpdate(
            { _id: findData._id },
            { listName: name },
            { new: true, runValidators: true }
        ) : null
        if (updateListById) {
            return NextResponse.json(
                {
                    success: true,
                    message: "List updated successfully",
                    data: updateListById
                }, { status: 200 }
            )
        }
    } catch (error) {
        console.log(error)
        return NextResponse.json(
            {
                success: false,
                message: "Something went wrong",
            }, { status: 500 }
        )
    }
}