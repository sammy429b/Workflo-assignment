import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config();
const DBconnection = async () => {
    const URL:any = process.env.MONGO_URI;
    try {
        await mongoose.connect(URL);
        console.log("mongo connection")
    } catch (error) {
        console.log(error)
    }
}

export default DBconnection;