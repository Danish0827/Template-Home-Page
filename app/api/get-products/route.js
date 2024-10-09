import { NextResponse } from 'next/server';
const WooCommerceRestApi = require('@woocommerce/woocommerce-rest-api').default;

const api = new WooCommerceRestApi({
	url: process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL,
	consumerKey: process.env.WC_CONSUMER_KEY,
	consumerSecret: process.env.WC_CONSUMER_SECRET,
	version: "wc/v3"
});

export async function GET(req) {
	const responseData = {
		success: false,
		products: [],
		error: null,
	};

	const { searchParams } = new URL(req.url);
	const page = searchParams.get('page') || 1; // Default to page 1
	const perPage = searchParams.get('perPage') || 100; // Default to 10 products per page
	const slug = searchParams.get('slug'); // Slug for individual product

	try {
		let data;

		// If slug is provided, fetch the product by slug
		if (slug) {
			const productResponse = await api.get('products', { slug });
			data = productResponse.data;

			// Ensure a product with the slug is found
			if (data.length === 0) {
				throw new Error(`No product found with slug: ${slug}`);
			}
		} else {
			// Otherwise, fetch products with pagination
			const productsResponse = await api.get('products', { page, per_page: perPage });
			data = productsResponse.data;
		}

		responseData.success = true;
		responseData.products = data;
		return NextResponse.json(responseData);
	} catch (error) {
		console.error('Error fetching products:', error);
		responseData.error = error.message;
		return NextResponse.json(responseData, { status: 500 });
	}
}
