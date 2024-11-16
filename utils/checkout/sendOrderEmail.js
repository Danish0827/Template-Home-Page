import nodemailer from "nodemailer";

export const sendOrderEmail = async (orderDetails) => {

  console.log(orderDetails)
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  try {
    // Verify transporter connection
    const testResult = await transporter.verify();
    // console.log("Transporter verified:", testResult);
  } catch (error) {
    // console.error("Error verifying transporter:", error);
    return { success: false, error: "Transporter verification failed" };
  }

  // Define the HTML content for the email
  const emailHtmlContent = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
      <h2 style="text-align: center; color: #4CAF50;">Thank you for your order!</h2>
      <p style="text-align: center;">Here are your order details:</p>
      <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
        <tr>
          <th style="text-align: left; padding: 8px; background-color: #f2f2f2; color: #333;">Order ID</th>
          <td style="padding: 8px; color: #555;">${orderDetails?.orderId}</td>
        </tr>
        <tr>
          <th style="text-align: left; padding: 8px; background-color: #f2f2f2; color: #333;">Total</th>
          <td style="padding: 8px; color: #555;">${orderDetails?.total} ${orderDetails?.currency}</td>
        </tr>
        <tr>
          <th style="text-align: left; padding: 8px; background-color: #f2f2f2; color: #333;">Currency</th>
          <td style="padding: 8px; color: #555;">${orderDetails?.currency}</td>
        </tr>
        <tr>
          <th style="text-align: left; padding: 8px; background-color: #f2f2f2; color: #333;">Payment URL</th>
          <td style="padding: 8px;"><a href="${orderDetails?.paymentUrl}" style="color: #4CAF50; text-decoration: none;">Complete your payment</a></td>
        </tr>
      </table>
      <p style="text-align: center; color: #777;">We appreciate your business!</p>
    </div>
  `;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: "customer@example.com", // Replace with the customer's email
    subject: "Your Order Confirmation",
    html: emailHtmlContent,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Order confirmation email sent successfully.");
  } catch (error) {
    console.error("Error sending order confirmation email:", error.message);
  }
};

