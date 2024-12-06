import React, { useState } from "react";

const ReviewComponent = ({ review }: any) => {
  const [reviews, setReviews] = useState([
    {
      rating: 5,
      title: "Great product!",
      comment: "Loved it!",
      date: "2024-12-01",
    },
    {
      rating: 4,
      title: "Good quality",
      comment: "Met my expectations.",
      date: "2024-12-02",
    },
    {
      rating: 5,
      title: "Excellent!",
      comment: "Highly recommend.",
      date: "2024-12-03",
    },
    {
      rating: 4,
      title: "Very nice",
      comment: "Would buy again.",
      date: "2024-12-04",
    },
  ]);
  const [newReview, setNewReview] = useState({
    rating: 0,
    title: "",
    comment: "",
    media: null,
  });

  // Calculate statistics
  const totalReviews = reviews.length;
  const averageRating = (
    reviews.reduce((sum, r) => sum + r.rating, 0) / totalReviews
  ).toFixed(1);
  const starCounts = Array(5)
    .fill(0)
    .map((_, i) => reviews.filter((r) => r.rating === 5 - i).length);

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newReview.rating && newReview.title && newReview.comment) {
      setReviews([
        ...reviews,
        { ...newReview, date: new Date().toISOString().split("T")[0] },
      ]);
      setNewReview({ rating: 0, title: "", comment: "", media: null });
    }
  };

  return (
    <div className="p-8 max-w-4xl mx-auto bg-white rounded-xl shadow-lg">
      {/* Overall Rating */}
      <div className="text-center mb-8">
        <h2 className="text-4xl font-bold text-gray-800">
          {averageRating} out of 5
        </h2>
        <p className="text-gray-500">Based on {totalReviews} reviews</p>
        <div className="flex justify-center items-center space-x-1 mt-2">
          {Array.from({ length: 4.5 }).map((_, i) => (
            <svg
              key={i}
              xmlns="http://www.w3.org/2000/svg"
              fill={i < Math.round(averageRating) ? "orange" : "none"}
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-6 h-6 text-orange-400"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 17.25l6.16 3.73-1.64-7.03L21 9.75l-7.19-.61L12 3 10.19 9.14 3 9.75l4.48 4.2-1.64 7.03L12 17.25z"
              />
            </svg>
          ))}
        </div>
      </div>

      {/* Star Distribution */}
      {/* <div className="grid grid-cols-5 gap-4 items-center text-sm mb-8"> */}
      {starCounts.map((count, i) => (
        <div
          key={i}
          className=" items-center space-x-2 col-span-5 sm:col-span-1"
        >
          <span className="text-gray-500">{5 - i} stars</span>
          <div className="flex-1 h-2 bg-gray-200 rounded-full relative">
            <div
              className="absolute top-0 left-0 h-2 bg-orange-400 rounded-full"
              style={{ width: `${(count / totalReviews) * 100}%` }}
            />
          </div>
          <span className="text-gray-600">{count}</span>
        </div>
      ))}
      {/* </div> */}

      {/* Write a Review */}
      <div>
        <h3 className="text-xl font-semibold text-gray-800 mb-4">
          Write a review
        </h3>
        <form onSubmit={handleReviewSubmit} className="space-y-4">
          {/* Rating */}
          <div className="flex items-center space-x-2">
            <span className="text-gray-700">Rating:</span>
            {Array.from({ length: 5 }).map((_, i) => (
              <button
                type="button"
                key={i}
                onClick={() => setNewReview({ ...newReview, rating: i + 1 })}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill={i < newReview.rating ? "orange" : "none"}
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="w-6 h-6 text-orange-400"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 17.25l6.16 3.73-1.64-7.03L21 9.75l-7.19-.61L12 3 10.19 9.14 3 9.75l4.48 4.2-1.64 7.03L12 17.25z"
                  />
                </svg>
              </button>
            ))}
          </div>
          {/* Title */}
          <input
            type="text"
            placeholder="Give your review a title"
            value={newReview.title}
            onChange={(e) =>
              setNewReview({ ...newReview, title: e.target.value })
            }
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
          {/* Comment */}
          <textarea
            placeholder="Write your comments here"
            value={newReview.comment}
            onChange={(e) =>
              setNewReview({ ...newReview, comment: e.target.value })
            }
            className="w-full p-2 border border-gray-300 rounded-md"
            rows={4}
            required
          ></textarea>
          {/* Media */}
          <div className="flex flex-col items-center space-y-2">
            <label className="cursor-pointer bg-gray-100 px-4 py-2 rounded-md border border-dashed text-gray-600">
              Upload Picture/Video
              <input
                type="file"
                className="hidden"
                onChange={(e) =>
                  setNewReview({
                    ...newReview,
                    media: e.target.files ? e.target.files[0] : null,
                  })
                }
              />
            </label>
            {newReview.media && (
              <p className="text-sm text-gray-500">{newReview.media.name}</p>
            )}
          </div>
          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-orange-500 text-white font-bold py-2 rounded-md hover:bg-orange-600"
          >
            Submit Review
          </button>
        </form>
      </div>
    </div>
  );
};

export default ReviewComponent;
