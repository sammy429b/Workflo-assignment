import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useAuth } from "@/context/useAuth";
import { ApiConfig } from "@/utils/ApiConfig";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function OTP() {
  const [value, setValue] = useState<string>("");
  const { userMailId, setIsOTP } = useAuth();
  const navigate = useNavigate();

  const handleVerifyOTP = async () => {
    const values = { otp: value, email: userMailId };
    try {
      const response = await axios.post(ApiConfig.verifyotp, values);
      const data = response.data;
      console.log(data);
      if (response.status) {
        setIsOTP(true)
        navigate('/password/reset');

      }
    } catch (error: any) {
      console.log("Error in verify otp", error);
    }
  };

  return (
    <div className="w-full h-screen flex flex-col gap-y-2 justify-center items-center">
      <div className="space-y-2">
        <InputOTP
          maxLength={6}
          value={value}
          onChange={(value: string) => setValue(value)}
        >
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
            <InputOTPSlot index={3} />
            <InputOTPSlot index={4} />
            <InputOTPSlot index={5} />
          </InputOTPGroup>
        </InputOTP>
        <div className="text-center text-sm">
          {value === "" ? (
            <>Enter your one-time password.</>
          ) : (
            <>You entered: {value}</>
          )}
        </div>
      </div>
      <Button onClick={handleVerifyOTP}>Submit</Button>
    </div>
  );
}
