import mongoose from 'mongoose'
import 'colors'

const connect: {isConnected?: number} = {}
export default async function dbConnect(name: string): Promise<void>{
    if(connect.isConnected){
        console.log(`Database is already connected | [This request is from ${name}]`.bgWhite)
        return
    }
    try {
        const db = await mongoose.connect(process.env.MONGODB_URL_TO_CONNECT || "")
        connect.isConnected = db.connections[0].readyState
        console.log(`databse connected Successfully | [This request is from ${name}]`.bgGreen)
    } catch (error: any) {
        console.log('database connection failed', error.message)
        process.exit()
    }
}