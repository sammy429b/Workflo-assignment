import {useAuth} from "@/context/useAuth"
import { Navigate, Outlet } from "react-router-dom"

const OTPRoute = () => {
    const {isMailId} = useAuth();
  return (
    <>
        {isMailId ? <Outlet /> : <Navigate to="/" />}
    </>
  )
}

export default OTPRoute