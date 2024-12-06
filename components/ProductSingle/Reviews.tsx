import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
// import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// Helper function to format the date
const formatDate = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "short",
    year: "numeric",
  };
  return new Date(dateString).toLocaleDateString("en-US", options);
};

const ReviewsCarousel = ({ products, reviewsData }: any) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch(
          `/api/get-productReviews?productId=${products.id}&page=1&perPage=100`
        );
        const data = await response.json();
        if (data.success) {
          setReviews(data.reviews);
          reviewsData(data.reviews);
        }
      } catch (error) {
        console.error("Error fetching reviews:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full text-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="p-8 bg-gradient-to-r from-gray-100 to-gray-50">
      <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-12">
        Customer Reviews
      </h1>
      <Swiper
        // modules={[Navigation, Pagination, Autoplay]}
        // navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000 }}
        spaceBetween={30}
        slidesPerView={1}
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
      >
        {reviews.map((review: any) => (
          <SwiperSlide key={review.id}>
            <div className="container relative bg-white shadow-md rounded-xl overflow-hidden border-t-4 border-templatePrimary hover:border-none hover:shadow-lg transform hover:scale-105 transition-transform duration-300">
              {/* Reviewer Section */}
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className="relative w-16 h-16 rounded-full overflow-hidden shadow-md">
                    <img
                      src={review.reviewer_avatar_urls["96"]}
                      alt="Reviewer Avatar"
                      className="object-cover w-full h-full"
                    />
                    {review.verified && (
                      <div className="absolute bottom-0 right-0 bg-indigo-500 text-white text-xs font-semibold rounded-full p-1">
                        ✔
                      </div>
                    )}
                  </div>
                  <div className="ml-4">
                    <h2 className="text-lg font-bold text-gray-800">
                      {review.reviewer}
                    </h2>
                    <p className="text-sm text-gray-500">
                      <i className="fas fa-calendar-alt mr-1"></i>
                      {formatDate(review.date_created)}
                    </p>
                  </div>
                </div>

                {/* Star Rating */}
                <div className="flex items-center mb-4">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <svg
                      key={index}
                      xmlns="http://www.w3.org/2000/svg"
                      fill={index < review.rating ? "currentColor" : "none"}
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className={`w-6 h-6 ${
                        index < review.rating
                          ? "text-yellow-400"
                          : "text-gray-300"
                      }`}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 17.25l6.16 3.73-1.64-7.03L21 9.75l-7.19-.61L12 3 10.19 9.14 3 9.75l4.48 4.2-1.64 7.03L12 17.25z"
                      />
                    </svg>
                  ))}
                  <span className="ml-2 text-sm font-medium text-gray-600">
                    ({review.rating}/5)
                  </span>
                </div>

                {/* Review Content */}
                <p
                  className="text-gray-700 leading-relaxed text-sm"
                  dangerouslySetInnerHTML={{ __html: review.review }}
                ></p>
              </div>

              {/* Footer Section */}
              {/* <div className=" bottom-0 left-0 right-0 p-4 bg-indigo-50 text-right">
                <a
                  href={review.product_permalink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-templatePrimary font-semibold text-sm hover:text-indigo-800"
                >
                  View
                </a>
              </div> */}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ReviewsCarousel;
