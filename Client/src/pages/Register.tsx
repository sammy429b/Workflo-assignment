import { Button } from "@/components/ui/button"
import { ButtonLoading } from "@/components/ui/buttonloading"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { PasswordInput } from "@/components/ui/passwordInput"
import { ApiConfig } from "@/utils/ApiConfig"
import axios from "axios"
import { useState } from "react"
import { useForm } from 'react-hook-form'
import { Link } from "react-router-dom"

interface userInputType {
    username: string,
    email: string,
    password: string,
    repassword: string
}
// console.log("render of register")
const Register = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const { register, handleSubmit } = useForm<userInputType>();

    const handleRegister = async (values: userInputType) => {
        console.table(values);
        try {
            setLoading(true);
            const response = await axios.post(ApiConfig.register, values);
            const data = await response.data;
            console.log(response.status)
            if (response.status === 409) {
                alert("Duplicate email")
            }
            if (response.status === 201) {
                alert("Rgister successfully")
                console.log(data)
            }
        } catch (error: any) {
            alert(error.response.data.message)
            console.log(error)
        }
        setLoading(false);
    }
    return (
        <>


            <div className="w-full h-screen flex justify-center items-center">
                <div className="w-10/12 md:w-1/3 border-2 px-6 py-12 rounded-md shadow-md">
                    <h1 className="barlow-semibold mb-4 text-center text-4xl font-semibold">
                        Welcome to <span className="text-blue-600">WorkFlo</span>!
                    </h1>
                    <form className="form flex flex-col gap-y-4" onSubmit={handleSubmit(handleRegister)}>
                        <div className="grid w-full max-w-xl items-center gap-1.5">
                            <Label htmlFor="username">Username</Label>
                            <Input {...register("username", { required: true })} type="text" id="username" placeholder="abc" />
                        </div>
                        <div className="grid w-full max-w-xl items-center gap-1.5">
                            <Label htmlFor="email">Email</Label>
                            <Input {...register("email", { required: true })} type="email" id="email" placeholder="xyz@gmail.com" />
                        </div>
                        <div className="grid w-full max-w-xl items-center gap-1.5">
                            <Label htmlFor="password">Password</Label>
                            <PasswordInput {...register("password", { required: true })} id="password" placeholder="********" />
                        </div>
                        {
                            loading ?
                                <ButtonLoading /> :
                                <Button className="mt-2">Register</Button>
                        }

                        <div className="text-center text-sm">
                            <Link
                                to="/"
                                className="text-center text-sm underline-offset-4 transition-all duration-200"
                            >
                                Already have an account? {" "}
                                <span className="text-blue-500">Log in</span>
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Register