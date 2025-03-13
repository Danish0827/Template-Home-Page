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

const SkeletonLoader = () => (
  <div className="p-6 animate-pulse">
    <div className="flex items-center mb-4">
      <div className="w-16 h-16 bg-gray-200 rounded-full"></div>
      <div className="ml-4">
        <div className="w-32 h-4 bg-gray-200 rounded"></div>
        <div className="w-24 h-4 bg-gray-200 rounded mt-2"></div>
      </div>
    </div>
    <div className="flex items-center mb-4">
      {Array.from({ length: 5 }).map((_, index) => (
        <div
          key={index}
          className="w-6 h-6 bg-gray-200 rounded-full mr-1"
        ></div>
      ))}
    </div>
    <div className="w-full h-16 bg-gray-200 rounded"></div>
  </div>
);

const ReviewsCarousel = ({ reviews }: any) => {
  console.log(reviews, "reviews");

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulating data fetch
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 2000); // Adjust the timeout to simulate your actual data fetch time

    return () => clearTimeout(timeout);
  }, []);

  return (
    <>
      <div className="p-8 bg-gradient-to-r from-gray-100 to-gray-50">
        <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-12">
          Customer Reviews
        </h1>
        {loading ? (
          // Show Skeleton Loader while loading
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 3 }).map((_, index) => (
              <div
                key={index}
                className="container bg-white shadow-md rounded-xl overflow-hidden border-t-4 border-gray-200"
              >
                <SkeletonLoader />
              </div>
            ))}
          </div>
        ) : (
          <>
            {reviews.length === 0 ? (
              <div className="shadow-md m-auto max-w-screen-md bg-white rounded-lg">
                <p className="px-3 py-10 text-center text-xl font-bold">
                  No Reviews
                </p>
              </div>
            ) : (
              <Swiper
                // modules={[Navigation, Pagination, Autoplay]}
                // navigation
                pagination={{ clickable: true }}
                autoplay={{ delay: 3000 }}
                spaceBetween={30}
                slidesPerView={1}
                loop={true}
                breakpoints={{
                  640: { slidesPerView: 1 },
                  768: { slidesPerView: 2 },
                  1024: { slidesPerView: 3 },
                }}
              >
                {reviews
                  .slice()
                  .reverse()
                  .map((review: any) => (
                    <SwiperSlide key={review.id}>
                      <div className="container relative bg-white shadow-md rounded-xl overflow-hidden border-t-4 border-templatePrimary hover:shadow-lg ">
                        {/* Reviewer Section */}
                        <div className="p-6 transform hover:scale-105 transition-transform duration-300">
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
                                fill={
                                  index < review.rating
                                    ? "currentColor"
                                    : "none"
                                }
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
                            className="text-gray-700 text-left leading-relaxed text-sm"
                            dangerouslySetInnerHTML={{ __html: review.review }}
                          ></p>
                        </div>
                      </div>
                    </SwiperSlide>
                  ))}
              </Swiper>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default ReviewsCarousel;
