import { NextResponse } from 'next/server';
const WooCommerceRestApi = require('@woocommerce/woocommerce-rest-api').default;

const api = new WooCommerceRestApi({
  url: process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL,
  consumerKey: process.env.WC_CONSUMER_KEY,
  consumerSecret: process.env.WC_CONSUMER_SECRET,
  version: "wc/v3"
});

// export default async function handler(req, res) {
//   if (req.method === 'DELETE') {
//     const { variantId, productId } = req.body;

//     if (!variantId || !productId) {
//       return res.status(400).json({ message: 'Variant ID and Product ID are required' });
//     }

//     try {
//       // Call the custom WooCommerce API endpoint for cart removal
//       const response = await fetch(`${process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL}/wp-json/custom-api/v1/remove-from-cart/`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ variantId, productId }),
//       });

//       const result = await response.json();

//       if (response.ok) {
//         return res.status(200).json({ message: 'Item removed from cart successfully' });
//       } else {
//         return res.status(400).json({ message: result });
//       }
//     } catch (error) {
//       console.error('Error removing item from cart:', error);
//       return res.status(500).json({ message: 'Internal server error' });
//     }
//   } else {
//     return res.status(405).json({ message: 'Method Not Allowed' });
//   }
// }

export default function handler(req, res) {
  if (req.method === 'PATCH') {
    // Example: Update item in the cart
    res.status(200).json({ success: true, message: 'Item quantity updated' });
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}