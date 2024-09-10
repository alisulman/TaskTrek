import dbConnect from "@/lib/dbConnect"
import MyList from "@/models/myLists.model"
import { ListModalType } from "@/Type/type"

export const GET = async () => {
    await dbConnect("Fetch All Lists")

    try {
        const fetchAllDataFromDatabase: ListModalType[] = await MyList.find()

        if (fetchAllDataFromDatabase.length > 0) {
            return Response.json(
                {
                    success: true,
                    message: `There are ${fetchAllDataFromDatabase.length} lists in database`,
                    data: fetchAllDataFromDatabase
                }, {status: 200}
            )
        } else {
            return Response.json(
                {
                    success: false,
                    message: "No lists found in database"
                }, {status: 404}
            )
        }
    } catch (error) {
        console.error(error)
        return Response.json(
            {
                success: false,
                message: "Something went wrong",
            }, {status: 500}
        )
    }
}
