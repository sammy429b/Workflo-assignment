import Register from "./pages/Register"
import Login from "./pages/Login"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import ForgotPassword from "./pages/ForgotPassword"
import ChangePassword from "./pages/ChangePassword"
import Main from "./pages/Main"
import PrivateRoute, { PublicRoute } from "./utils/PrivateRoute"
import OTP from "./pages/OTP"
import ForgotPasswordOTP from "./pages/ForgotPasswordOTP"
import OTPRoute from "./utils/OTPRoute"
import ForgotPasswordRoute from "./utils/ForgotPasswordRoute"
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<PublicRoute />}>
            <Route path="/" element={<Login />}></Route>
            <Route path="/register" element={<Register />}></Route>
            <Route path="/password/email" element={<ForgotPasswordOTP />}></Route>
          </Route>
          <Route element={<ForgotPasswordRoute />}>
            <Route path="/password/reset" element={<ForgotPassword />}></Route>
          </Route>
          <Route element={<OTPRoute />}>
            <Route path="/password/otp" element={<OTP />}></Route>
          </Route>
          <Route element={<PrivateRoute />}>
            <Route path="/main" element={<Main />}></Route>
            <Route path="/password/change" element={<ChangePassword />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App