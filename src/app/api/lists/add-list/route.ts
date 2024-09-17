import dbConnect from "@/lib/dbConnect"
import MyList from "@/models/myLists.model"
import GenerateColor from "@/utils/color"
import { NextResponse } from "next/server"

export const POST = async (req: Request) => {
    await dbConnect("Add List")

    try {
        const { name } = await req.json() as {name: string}

        const color = GenerateColor()

        const createNewListInDatabase = await MyList.create({listName: name, color: color})
        const findListIsItCreated = await MyList.findById(createNewListInDatabase._id)
        if(findListIsItCreated){
            return NextResponse.json(
                {
                    success: true,
                    message: "List created successfully",
                    data: findListIsItCreated
                }, { status: 201 }
            )
        } else {
            return NextResponse.json(
                {
                    success: false,
                    message: "Failed to create list. Please Try Again later",
                }, { status: 500 }
            )
        }
    } catch (error: any) {
        console.error(error.message)
        return NextResponse.json(
            {
                success: false,
                message: "Something went wrong",
                error: error.message
            }, { status: 500 }
        )
    }
}