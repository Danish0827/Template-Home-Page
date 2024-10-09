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
		categories: [],
		error: null,
	};

	const { searchParams } = new URL(req.url);
	const page = searchParams.get('page') || 1; // Default to page 1
	const perPage = searchParams.get('perPage') || 100; // Default to 100 categories per page
	const slug = searchParams.get('slug'); // Slug for individual category

	try {
		let data;

		// If slug is provided, fetch the category by slug
		if (slug) {
			const categoryResponse = await api.get('products/categories', { slug });
			data = categoryResponse.data;

			// Ensure a category with the slug is found
			if (data.length === 0) {
				throw new Error(`No category found with slug: ${slug}`);
			}
		} else {
			// Otherwise, fetch categories with pagination
			const categoriesResponse = await api.get('products/categories', { page, per_page: perPage });
			data = categoriesResponse.data;
		}

		responseData.success = true;
		responseData.categories = data;
		return NextResponse.json(responseData);
	} catch (error) {
		console.error('Error fetching categories:', error);
		responseData.error = error.message;
		return NextResponse.json(responseData, { status: 500 });
	}
}
