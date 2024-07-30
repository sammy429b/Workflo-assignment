import {useAuth} from "@/context/useAuth"
import { Navigate, Outlet } from "react-router-dom"

const PrivateRoute = () => {
    const {isAuthenticated} = useAuth();
  return (
    <>
        {isAuthenticated ? <Outlet /> : <Navigate to="/" />}
    </>
  )
}

export const PublicRoute = () => {
    const {isAuthenticated} = useAuth();
  return (
    <>
        {!isAuthenticated ? <Outlet /> : <Navigate to="/main" />}
    </>
  )
}

export default PrivateRoute