import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    const body = await req.json(); // Parse JSON from the request body
    const { email, otp } = body;
    console.log("Request Body:", email, otp);

    if (!email || !otp) {
      return new Response(
        JSON.stringify({ message: "Email and OTP are required." }),
        { status: 400 }
      );
    }

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: `"Shoes Logo" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Your OTP Code",
      text: `Your OTP code is: ${otp}. This code will expire in 10 minutes.`,
    };

    await transporter.sendMail(mailOptions);
    console.log(`OTP sent to ${email}`);
    return new Response(JSON.stringify({ message: "OTP sent successfully." }), {
      status: 200,
    });
  } catch (error) {
    console.error("Error sending OTP:", error);
    return new Response(
      JSON.stringify({ message: "Failed to send OTP. Please try again." }),
      { status: 500 }
    );
  }
}
