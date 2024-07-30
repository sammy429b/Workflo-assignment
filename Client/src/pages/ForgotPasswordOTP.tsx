import { Label } from "@radix-ui/react-label"
import { Input } from "../components/ui/input"
import { Button } from "../components/ui/button"
import { useForm } from "react-hook-form"
import axios from "axios"
import { ApiConfig } from "@/utils/ApiConfig"
import { useState } from "react"
import { ButtonLoading } from "@/components/ui/buttonloading"
import { useNavigate } from "react-router-dom"
import { useAuth } from "@/context/useAuth"

 

const ForgotPasswordOTP = () => {
    const Navigate = useNavigate();
    const {setIsMailId, setUserMailId, userMailId} = useAuth();
    const {register, handleSubmit} = useForm();
    const [loading, setLoading] = useState<boolean>(false);
    const handleGetOTP = async(values:any) => {
        console.log(values)
        setLoading(true)
        try {
            const response = await axios.post(ApiConfig.getotp, values);
            const data = await response.data;
            console.log(data)

            if(response.status === 200){
                setUserMailId(values.email)
                console.log(userMailId)
                setIsMailId(true)
                Navigate('/password/otp');
            }
           
        } catch (error:any) {
            console.log("Error in get otp",error)
        } finally{
            setLoading(false)
        }
    }
    return (
        <>
            <div className="w-full h-screen flex justify-center items-center">
                <div className="w-9/12 md:w-1/3 border-2 px-6 py-12 rounded-md shadow-md">
                    {/* <h1 className="mb-4 text-center text-2xl">Change Password</h1> */}
                    <p className="text-xs mb-6 text-gray-400">Enter the email address associated with your account and we'll send you a otp to reset your password.</p>
                    <form className=" flex flex-col gap-y-4" onSubmit={handleSubmit(handleGetOTP)}>
                    <div className="grid w-full max-w-xl items-center gap-1.5">
                            <Label htmlFor="email">Email</Label>
                            <Input {...register("email", { required: true })} type="email" id="email" placeholder="xyz@gmail.com" />
                        </div>
                        {!loading ? (<Button className="mt-2">Get OTP</Button>) :
                            (<ButtonLoading/>)
                        }
                    </form>
                </div>
            </div>
        </>
    )
}

export default ForgotPasswordOTP


