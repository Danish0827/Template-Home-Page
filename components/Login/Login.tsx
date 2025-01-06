"use client";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import { notification } from "antd";
import { IoIosArrowDropleftCircle } from "react-icons/io";

const Login = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState(null);
  const [step, setStep] = useState(1); // 1: Email input, 2: OTP confirmation
  const [isSending, setIsSending] = useState(false); // Disable button while sending OTP
  const [timer, setTimer] = useState(0); // Timer state
  const router = useRouter();

  // Redirect if auth cookie exists
  useEffect(() => {
    // Check for auth cookie
    const authCookie = document.cookie
      .split("; ")
      .find((row) => row.startsWith("auth="));

    if (authCookie) {
      router.push("/account/orders");
    } else {
      // Restore step from localStorage
      const savedStep = localStorage.getItem("loginStep");
      if (savedStep) {
        setStep(parseInt(savedStep, 10)); // Restore step from localStorage
      }
    }
  }, [router]);

  // Update localStorage whenever step changes
  useEffect(() => {
    localStorage.setItem("loginStep", step.toString());
  }, [step]);

  const generateOtp = () => {
    const otp: any = Math.floor(100000 + Math.random() * 900000).toString(); // Generate random 6-digit OTP
    const enhancedOtp = `258${otp}963`; // Add prefix and suffix
    localStorage.setItem("very_id", enhancedOtp); // Store in localStorage
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

    const storedOtp = localStorage.getItem("very_id");
    const originalOtp = storedOtp?.substring(3, 9); // Extract the original OTP

    if (otp === originalOtp) {
      notification.success({
        message: "Success!",
        description: `OTP confirmed! Logging in...`,
        duration: 3,
        showProgress: true,
      });
      // Clear OTP from localStorage
      localStorage.removeItem("loginStep"); // Clear login step
      localStorage.removeItem("otp"); // Clear OTP

      // Create a cookie (example cookie creation)
      document.cookie = `auth=true; path=/; max-age=3600*24;`; // Cookie valid for 1 day

      // Process email
      const modifiedEmail = email.replace("@gmail.com", ""); // Remove @gmail.com
      const modifiedEmails = `alhgga-${modifiedEmail}-vsstaa`; // Add prefix and suffix

      // Set the modified email as a cookie with no expiration
      document.cookie = `user_g=${modifiedEmails}; path=/;`;

      console.log("Cookie set:", `user_g=${modifiedEmails}`);
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

  const reSendOtp = async (e: any, email: any) => {
    e.preventDefault();
    // console.log(email,"emailcas");

    if (!email)
      return notification.error({
        message: "Email is required",
        description: `Please enter valid Email`,
        duration: 3,
      });

    setIsSending(true); // Disable the button
    setTimer(30); // Start a 30-second time
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

  // Timer logic
  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);

      return () => clearInterval(interval); // Cleanup on unmount or when timer reaches 0
    }
  }, [timer]);

  const backStep = async (e: any) => {
    e.preventDefault();
    setStep(1);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-3">
      <div className="bg-white shadow-lg rounded-lg px-8 py-14 w-full sm:w-3/5 lg:w-1/3">
        {step === 2 && (
          <p onClick={backStep} className="-mt-10 -ml-4">
            <IoIosArrowDropleftCircle className="text-templatePrimary text-2xl lg:text-3xl" />
          </p>
        )}
        <div className="flex items-center justify-center mb-4">
          <a href="/">
            <img
              alt="logo"
              src="https://bovinosbck.demo-web.live/wp-content/uploads/2024/12/logo.jpg"
              className="w-44 h-auto"
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
                className="w-full py-2 px-4 bg-templatePrimary text-white font-semibold rounded-md hover:bg-templatePrimaryLight focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-400"
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
              <h1 className="text-xl font-bold text-gray-700">Enter OTP</h1>
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
                className="w-full py-2 px-4 bg-templatePrimary text-white font-semibold rounded-md hover:bg-templatePrimaryLight focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Confirm OTP
              </button>
            </form>
          </>
        )}

        <footer className="mt-4 flex justify-between">
          <a
            href="/policies/privacy-policy"
            className="text-templatePrimary hover:underline"
          >
            Privacy
          </a>
          {step === 2 && (
            <div className="flex items-center gap-3">
              <div>
                {timer > 0 && (
                  <span className="w-8 h-8 text-sm flex justify-center items-center border-templatePrimary border rounded-full">
                    {timer}
                  </span>
                )}
              </div>
              <p
                onClick={
                  !isSending && timer === 0
                    ? (e) => {
                        reSendOtp(e, email);
                      }
                    : undefined
                }
                className={`text-templatePrimary hover:text-templatePrimaryLight cursor-pointer ${
                  isSending || timer > 0 ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                Resend OTP
              </p>
            </div>
          )}
        </footer>
      </div>
    </div>
  );
};

export default Login;
// danishshaikh.st@gmail.com
