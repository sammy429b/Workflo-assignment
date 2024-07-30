import { Document, model, Schema } from "mongoose";

export interface UserResult<T> extends Document{
    _doc:T;
}

export interface UserSchemaType extends UserResult<UserSchemaType>{
    username:string,
    email:string,
    password:string
}

const userSchema = new Schema<UserSchemaType>({
    username:{
        required:true,
        type: String,
    },
    email:{
        required:true,
        unique: true,
        type: String,
    },
    password:{
        required:true,
        unique: true,
        type: String,
    }
})

const User = model<UserSchemaType>("User",userSchema)

export default User;