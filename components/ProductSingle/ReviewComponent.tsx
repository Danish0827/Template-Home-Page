import React, { useEffect, useState } from "react";

interface Review {
  rating: number;
  product_name: string;
  review: string;
  date_created: string;
  reviewer: string;
  reviewer_email: string;
  reviewer_avatar_urls: { [key: number]: string };
}

interface product {
  id: number;
  // slug: string;
}

interface ReviewProps {
  review: Review[];
  product: any;
  render: boolean;
  setRender: React.Dispatch<React.SetStateAction<boolean>>;
}

const ReviewComponent: React.FC<ReviewProps> = ({
  review,
  product,
  render,
  setRender,
}) => {
  // console.log(product, "product");

  const [showReview, setShowReview] = useState(false);
  const handleShowReview = () => {
    setShowReview(!showReview);
  };
  const [reviews, setReviews] = useState<
    {
      rating: number;
      comment: string;
      name: string;
      email: string;
      date: string;
      reviewer: string;
      avatar: string;
    }[]
  >([]);
  const [newReview, setNewReview] = useState({
    product_id: product?.id,
    rating: 0,
    reviewer: "",
    reviewer_email: "",
    review: "",
    // media: null as File | null,
  });
  useEffect(() => {
    setNewReview({
      product_id: product?.id,
      rating: 0,
      reviewer: "",
      reviewer_email: "",
      review: "",
      // media: null as File | null,
    });
  }, [product]);
  // console.log(newReview, "newReview");
  useEffect(() => {
    if (review) {
      setReviews(
        review.map((item) => ({
          rating: item.rating,
          name: item.reviewer,
          email: item.reviewer_email,
          comment: item.review.replace(/<\/?[^>]+(>|$)/g, ""), // Strip HTML tags
          date: new Date(item.date_created).toLocaleDateString(),
          reviewer: item.reviewer,
          avatar: item.reviewer_avatar_urls[48],
        }))
      );
    }
  }, [review]);

  const totalReviews = reviews.length;
  const averageRating = (
    reviews.reduce((sum, r) => sum + r.rating, 0) / totalReviews || 0
  ).toFixed(1);
  const starCounts = Array.from(
    { length: 5 },
    (_, i) => reviews.filter((r) => r.rating === 5 - i).length
  );

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // console.log(newReview);

    try {
      const response = await fetch("/api/createProductReviews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newReview),
      });

      const data = await response.json();
      if (response.ok) {
        alert("Review submitted successfully!");
        setNewReview({
          product_id: product?.id,
          rating: 0,
          reviewer: "",
          reviewer_email: "",
          review: "",
        });
        setRender(!render);
      } else {
        alert(`Error: ${data.error}`);
      }
    } catch (error) {
      console.error("Error submitting review:", error);
      alert("Failed to submit review. Please try again.");
    }
  };
  //   if (
  //     newReview.product_id &&
  //     newReview.reviewer_email &&
  //     newReview.rating &&
  //     newReview.reviewer &&
  //     newReview.review
  //   ) {
  //     setReviews([
  //       ...reviews,
  //       {
  //         ...newReview,
  //         date: new Date().toLocaleDateString(),
  //         reviewer: "You",
  //         avatar: "", // Placeholder avatar
  //       },
  //     ]);
  //     setNewReview({
  //       product_id: "",
  //       rating: 0,
  //       reviewer: "",
  //       reviewer_email: "",
  //       review: "",
  //       ff,
  //       // media: null,
  //     });
  //     console.log(newReview);
  //   }
  // };

  // console.log(product?.id);

  return (
    <div id="reviews" className="p-8 max-w-4xl mx-auto bg-white">
      {/* Overall Rating */}
      {reviews.length === 0 ? (
        <h2 className="text-4xl font-bold text-gray-800 text-center mb-2">
          No Review
        </h2>
      ) : (
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold text-gray-800">
            {averageRating} out of 5
          </h2>
          <p className="text-gray-500">Based on {totalReviews} reviews</p>
          <div className="flex justify-center items-center space-x-1 mt-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <svg
                key={i}
                xmlns="http://www.w3.org/2000/svg"
                fill={
                  i < Math.round(parseFloat(averageRating)) ? "orange" : "none"
                }
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
      )}
      <div className="flex gap-3 items-center">
        {reviews.length === 0 ? (
          <div className="my-5 w-1/2">
            <div className="flex justify-center items-center space-x-1 mt-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <svg
                  key={i}
                  xmlns="http://www.w3.org/2000/svg"
                  fill={
                    i < Math.round(parseFloat(averageRating))
                      ? "orange"
                      : "none"
                  }
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
            <p className="mt-2 flex justify-center">
              Be the first to write a review
            </p>
          </div>
        ) : (
          <div className="my-5 w-1/2">
            {starCounts.map((count, i) => (
              <div key={i} className="mb-4">
                <div className="flex justify-between text-gray-500">
                  <span>{5 - i} stars</span>
                  <span>{count}</span>
                </div>
                <div className="w-full h-2 bg-gray-200 rounded-full relative">
                  <div
                    className="absolute top-0 left-0 h-2 bg-orange-400 rounded-full"
                    style={{ width: `${(count / totalReviews) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
        <div className="flex justify-center w-1/2">
          <button
            onClick={handleShowReview}
            className="bg-black text-white font-semibold rounded-full px-5 py-2"
          >
            {!showReview ? "Write a review" : "Cancel review"}
          </button>
        </div>
      </div>
      {showReview && (
        <div className="border-t ">
          <h3 className="text-2xl font-semibold text-center text-gray-800 mt-5 mb-2">
            Write a review
          </h3>
          <form onSubmit={handleReviewSubmit} className="space-y-4">
            {/* Rating */}
            <div className="text-center">
              <p className="text-gray-700 uppercase font-semibold text-sm">
                Rating
              </p>
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
                    className="w-8 h-8 text-orange-400"
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
              placeholder="Enter your name"
              value={newReview.reviewer}
              onChange={(e) =>
                setNewReview({ ...newReview, reviewer: e.target.value })
              }
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
            <input
              type="email"
              placeholder="Enter your email address"
              value={newReview.reviewer_email}
              onChange={(e) =>
                setNewReview({ ...newReview, reviewer_email: e.target.value })
              }
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
            {/* Comment */}
            <textarea
              placeholder="Write your comments here"
              value={newReview.review}
              onChange={(e) =>
                setNewReview({ ...newReview, review: e.target.value })
              }
              className="w-full p-2 border border-gray-300 rounded-md"
              rows={4}
              required
            ></textarea>
            {/* Media */}
            {/* <div className="flex flex-col items-center space-y-2">
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
            </div> */}
            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-orange-500 text-white font-bold py-2 rounded-md hover:bg-orange-600"
            >
              Submit Review
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ReviewComponent;
