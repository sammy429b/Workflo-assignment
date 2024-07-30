import {useAuth} from "@/context/useAuth"
import { Navigate, Outlet } from "react-router-dom"

const ForgotPasswordRoute = () => {
    const {isOTP} = useAuth();
  return (
    <>
        {isOTP ? <Outlet /> : <Navigate to="/" />}
    </>
  )
}

export default ForgotPasswordRoute