"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState(null);
  const [step, setStep] = useState(1); // 1: Email input, 2: OTP confirmation
  const router = useRouter();

  const generateOtp = () => {
    const otp: any = Math.floor(100000 + Math.random() * 900000).toString(); // Generate random 6-digit OTP
    const enhancedOtp = `258${otp}963`; // Add prefix and suffix
    localStorage.setItem("otp", enhancedOtp); // Store in localStorage
    console.log("Generated OTP (for testing):", otp); // Log OTP for testing
    return otp;
  };

  const sendOtp = async (e: any) => {
    e.preventDefault();
    if (!email) return alert("Email is required");

    const otp = generateOtp();
    console.log(email, otp, "dasdsa");

    try {
      const response = await fetch("/api/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
      });

      if (response.ok) {
        alert(`OTP sent to ${email}`);
        setGeneratedOtp(otp); // Save OTP locally for confirmation
        setStep(2); // Move to OTP confirmation step
      } else {
        alert("Failed to send OTP. Please try again.");
      }
    } catch (error) {
      console.error("Error sending OTP:", error);
      alert("Error sending OTP. Please try again.");
    }
  };

  const confirmOtp = (e: any) => {
    e.preventDefault();

    const storedOtp = localStorage.getItem("otp");
    const originalOtp = storedOtp?.substring(3, 9); // Extract the original OTP

    if (otp === originalOtp) {
      alert("OTP confirmed! Logging in...");

      // Clear OTP from localStorage
      localStorage.removeItem("otp");

      // Create a cookie (example cookie creation)
      document.cookie = `auth=true; path=/; max-age=3600*24;`; // Cookie valid for 1 hour
      // Navigate to home page
      router.push("/");
    } else {
      alert("Invalid OTP. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg px-8 py-14 w-1/3">
        <div className="flex items-center justify-center mb-4">
          <a href="https://www.cottonculture.co.in">
            <img
              alt="logo"
              src="https://cdn.shopify.com/s/files/1/0883/8204/6526/files/coooo-280x280_200x60@2x.webp?v=1721391526.webp"
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
                className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Send OTP
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
