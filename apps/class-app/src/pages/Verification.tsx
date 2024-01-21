import React, { useState } from "react";
import OtpInput from "react-otp-input";
import Layout from "../layouts/Layout";

const Verification: React.FC = () => {
  const [otp, setOtp] = useState<string>("");

  const handleVerify = () => {
    // Add your verification logic here
    console.log("Verifying OTP:", otp);
  };

  return (
    <Layout>
      <div className="flex max-w-[467px] flex-col items-center text-sm md:text-base">
        <h2 className="text-2xl font-bold mb-4">Verification</h2>
        <div className="mb-4">
          <p className="mb-2">Enter the Pin sent to email.</p>
          <OtpInput
            value={otp}
            onChange={setOtp}
            numInputs={6}
            containerStyle="flex justify-between gap-1"
            inputType="number"
            inputStyle="!w-[15%] aspect-square border-[0.25px] border-[#0068FF]/10 focus:border-abeg-teal focus:border rounded-[3px] mt-6"
            renderSeparator={<span>-</span>}
            renderInput={(props) => <input {...props} />}
          />
        </div>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
          onClick={handleVerify}
        >
          Verify
        </button>
      </div>
    </Layout>
  );
};

export default Verification;
