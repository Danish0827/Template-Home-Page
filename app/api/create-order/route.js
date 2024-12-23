export async function POST(req) {
  const WooCommerceRestApi =
    require("@woocommerce/woocommerce-rest-api").default;
  const nodemailer = require("nodemailer");
  const { isEmpty } = require("lodash");

  const api = new WooCommerceRestApi({
    url: process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL,
    consumerKey: process.env.WC_CONSUMER_KEY,
    consumerSecret: process.env.WC_CONSUMER_SECRET,
    version: "wc/v3",
  });

  const responseData = {
    success: false,
    orderDetails: null,
    error: "",
  };
  const body = await req.json(); // Parse the JSON body from the request
  console.log(body, "Request Body");

  if (isEmpty(body)) {
    responseData.error = "Required data not sent";
    return new Response(JSON.stringify(responseData), { status: 400 });
  }

  body.status = body.payment_method == "cod" ? "pending" : "failed";
  body.set_paid = false;

  try {
    const { data } = await api.post("orders", body);

    // Include the entire response data
    responseData.success = true;
    responseData.orderDetails = data;
    console.log(data, responseData, "orderDetails");

    // Send email notification
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com", // Change host if not using Gmail
      port: 465, // For SSL, use 587 for TLS
      secure: true, // Use true for 465, false for 587
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: `"Your Store Name" <${process.env.SMTP_USER}>`, // Sender address
      to: body.billing.email, // Send to the customer's email address
      subject: `Order Confirmation - #${data.id}`, // Subject line
      text: `Thank you for your order! Your order ID is #${data.id}.`, // Plain text body
      html: `
		  <div style="font-family: Arial, sans-serif; line-height: 1.5; color: #333; max-width: 600px; margin: 0 auto; border: 1px solid #ddd; padding: 20px;">
			<div style="text-align: center; border-bottom: 1px solid #ddd; padding-bottom: 20px; margin-bottom: 20px;">
			  <img src="https://www.cottonculture.co.in/cdn/shop/files/Cotton_Culture_logo_1_3.jpg?v=1722679086&width=150" alt="Your Store Logo" style="max-width: 150px;">
			  <h2 style="margin-top: 10px;">Order #${data.id}</h2>
			</div>
			
			<p style="font-size: 16px;">Thank you for your purchase, ${
        body.billing.first_name
      }!</p>
			<p>We're getting your order ready to be shipped. We’ll notify you once it has been sent.</p>
			
	  
			<h3 style="border-bottom: 1px solid #ddd; padding-bottom: 10px;">Order Summary</h3>
			<table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
			  ${data.line_items
          .map(
            (item) => `
				  <tr style="border-bottom: 1px solid #ddd;">
					<td style="padding: 10px 0; width: 60%;"><strong>${item.name}</strong> x ${item.quantity}</td>
					<td style="text-align: right; padding: 10px 0;">₹${item.total}</td>
				  </tr>`
          )
          .join("")}
			  <tr>
				<td style="padding: 10px 0;"><strong>Subtotal</strong></td>
				<td style="text-align: right; padding: 10px 0;">₹${data.total}</td>
			  </tr>
			  <tr>
				<td style="padding: 10px 0;"><strong>Shipping</strong></td>
				<td style="text-align: right; padding: 10px 0;">₹${data.shipping_total}</td>
			  </tr>
			  <tr>
				<td style="padding: 10px 0;"><strong>Total</strong></td>
				<td style="text-align: right; padding: 10px 0; font-size: 18px; color: #000;"><strong>₹${
          data.total
        }</strong></td>
			  </tr>
			</table>
	  
			<h3 style="border-bottom: 1px solid #ddd; padding-bottom: 10px;">Customer Information</h3>
			<p><strong>Shipping Address:</strong></p>
			<p>
			  ${data.shipping.first_name} ${data.shipping.last_name}<br>
			  ${data.shipping.address_1}, ${data.shipping.address_2}<br>
			  ${data.shipping.city}, ${data.shipping.state}<br>
			  ${data.shipping.postcode}, ${data.shipping.country}
			</p>
			<p><strong>Phone:</strong> ${data.shipping.phone}</p>
	  
			<p style="margin-top: 20px;">If you have any questions, reply to this email or contact us at <a href="mailto:info@yourstore.com" style="color: #007bff; text-decoration: none;">info@yourstore.com</a>.</p>
	  
			<footer style="text-align: center; margin-top: 20px; font-size: 12px; color: #888;">
			  <p>&copy; 2024 Your Store Name. All rights reserved.</p>
			</footer>
		  </div>
		`,
    };
    {
      /* <div style="text-align: center; margin: 20px 0;">
			  <a href="VIEW_ORDER_LINK_HERE" style="display: inline-block; background-color: #007bff; color: #fff; padding: 10px 20px; text-decoration: none; border-radius: 5px; font-size: 16px;">View your order</a>
			  <p style="margin-top: 10px;"><a href="STORE_LINK_HERE" style="color: #007bff; text-decoration: none;">or Visit our store</a></p>
			</div> */
    }
    await transporter.sendMail(mailOptions);

    return new Response(JSON.stringify(responseData), { status: 200 });
  } catch (error) {
    responseData.error = error.message;
    return new Response(JSON.stringify(responseData), { status: 500 });
  }
}
