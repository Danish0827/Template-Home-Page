"use client";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import { notification } from "antd";

const Login = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState(null);
  const [step, setStep] = useState(1); // 1: Email input, 2: OTP confirmation
  const [isSending, setIsSending] = useState(false); // Disable button while sending OTP
  const router = useRouter();

  // Redirect if auth cookie exists
  useEffect(() => {
    const authCookie = document.cookie
      .split("; ")
      .find((row) => row.startsWith("auth="));
    if (authCookie) {
      router.push("/account/orders");
    }
  }, [router]);

  const generateOtp = () => {
    const otp: any = Math.floor(100000 + Math.random() * 900000).toString(); // Generate random 6-digit OTP
    const enhancedOtp = `258${otp}963`; // Add prefix and suffix
    localStorage.setItem("otp", enhancedOtp); // Store in localStorage
    return otp;
  };

  const sendOtp = async (e: any) => {
    e.preventDefault();
    if (!email)
      return notification.error({
        message: "Email is required",
        description: `Please enter valid Email`,
        duration: 3,
      });

    setIsSending(true); // Disable the button
    const otp = generateOtp();

    try {
      const response = await fetch("/api/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
      });

      if (response.ok) {
        notification.success({
          message: "OTP sent",
          description: `OTP sent to ${email}`,
          duration: 3,
        });
        setGeneratedOtp(otp); // Save OTP locally for confirmation
        setStep(2); // Move to OTP confirmation step
      } else {
        notification.error({
          message: "Failed",
          description: `Error sending OTP. Please try again.`,
          duration: 3,
        });
      }
    } catch (error) {
      // console.error("Error sending OTP:", error);
      notification.error({
        message: "Failed",
        description: `Error sending OTP. Please try again.`,
        duration: 3,
      });
    } finally {
      setIsSending(false); // Re-enable the button
    }
  };

  const confirmOtp = (e: any) => {
    e.preventDefault();

    const storedOtp = localStorage.getItem("otp");
    const originalOtp = storedOtp?.substring(3, 9); // Extract the original OTP

    if (otp === originalOtp) {
      notification.success({
        message: "Success!",
        description: `OTP confirmed! Logging in...`,
        duration: 3,
        showProgress: true,
      });
      // Clear OTP from localStorage
      localStorage.removeItem("otp");

      // Create a cookie (example cookie creation)
      document.cookie = `auth=true; path=/; max-age=3600*24;`; // Cookie valid for 1 day

      // Process email
      let modifiedEmail = email.replace("@gmail.com", ""); // Remove @gmail.com
      modifiedEmail = `alhgga-${modifiedEmail}-vsstaa`; // Add prefix and suffix

      // Set the modified email as a cookie with no expiration
      document.cookie = `user_g=${modifiedEmail}; path=/;`;

      console.log("Cookie set:", `user_g=${modifiedEmail}`);
      // Navigate to home page
      router.push("/account/orders");
    } else {
      notification.error({
        message: "Invalid OTP",
        description: `Invalid OTP. Please try again.`,
        duration: 3,
      });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg px-8 py-14 w-1/3">
        <div className="flex items-center justify-center mb-4">
          <a href="/">
            <img
              alt="logo"
              src="https://bovinosbck.demo-web.live/wp-content/uploads/2024/11/images-e1732688867572.jpeg"
              className="w-32 h-auto"
            />
          </a>
        </div>

        {step === 1 && (
          <>
            <div className="mb-4">
              <h1 className="text-2xl font-bold text-gray-700">Log in</h1>
              <h3 className="text-gray-500">
                Enter your email and we'll send you a login code
              </h3>
            </div>

            <form onSubmit={sendOtp}>
              <div className="mb-4">
                <label
                  htmlFor="account_email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="account_email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="username"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-500"
                  placeholder="your-email@example.com"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-400"
                disabled={isSending}
              >
                {isSending ? "Sending..." : "Send OTP"}
              </button>
            </form>
          </>
        )}

        {step === 2 && (
          <>
            <div className="mb-4">
              <h1 className="text-2xl font-bold text-gray-700">Enter OTP</h1>
              <h3 className="text-gray-500">Sent to {email}</h3>
            </div>

            <form onSubmit={confirmOtp}>
              <div className="mb-4">
                <label
                  htmlFor="otp"
                  className="block text-sm font-medium text-gray-700"
                >
                  OTP
                </label>
                <input
                  type="text"
                  id="otp"
                  required
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  maxLength={6}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-500"
                  placeholder="Enter 6-digit OTP"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Confirm OTP
              </button>
            </form>
          </>
        )}

        <footer className="mt-4 text-left">
          <a
            href="/policies/privacy-policy"
            className="text-blue-600 hover:underline"
          >
            Privacy
          </a>
        </footer>
      </div>
    </div>
  );
};

export default Login;
