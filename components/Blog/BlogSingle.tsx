"use client";
import React, { useEffect, useState } from "react";
import BlogLatest from "./BlogLatest";
import { Modal } from "antd";

const BlogSingleSkeleton = () => (
  <div className="container py-16 mx-auto p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
    <div className="content-area col-span-2">
      <div className="bg-gray-300 h-48 w-full mb-4 rounded-md"></div>
      <div className="h-6 bg-gray-300 rounded w-3/4 mb-4"></div>
      <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
      <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
      <div className="h-4 bg-gray-300 rounded w-full"></div>
    </div>
    <div className="widget-area">
      {[...Array(5)].map((_, index) => (
        <div key={index} className="flex gap-4 mb-4 items-start">
          <div className="w-16 h-16 bg-gray-300 rounded-lg"></div>
          <div className="flex-1 space-y-2">
            <div className="h-4 bg-gray-300 rounded-md w-3/4"></div>
            <div className="h-4 bg-gray-300 rounded-md w-1/4"></div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const BlogSingle = ({ params }: any) => {
  const bg = "./white bg.png";
  const [blog, setBlog] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [videoSrc, setVideoSrc] = useState("");

  const openModal = () => {
    setIsModalOpen(true);
    setVideoSrc(blog?.video_link || ""); // Safely set video link
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setVideoSrc(""); // Clear the video link on modal close
  };

  useEffect(() => {
    fetch(`${process.env.BACKEND}/disease/${params}`)
      .then((response) => response.json())
      .then((data) => {
        setBlog(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching blog:", error);
        setLoading(false);
      });
  }, [params]);

  if (loading) {
    return <BlogSingleSkeleton />;
  }

  return (
    <div
      style={{
        backgroundImage: `url('${bg}')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      className="container py-16 mx-auto p-4 grid grid-cols-1 md:grid-cols-3 gap-4"
    >
      <div className="content-area col-span-2">
        <div className="type-post mb-6 bg-white shadow-md p-4 rounded-md">
          <div className="entry-cover relative">
            <div>
              <img
                className="w-full rounded-md"
                alt={blog.title}
                src={blog.image}
                onClick={blog.video_link ? openModal : closeModal}
              />
            </div>
            {/* Modal component */}
            <Modal
              open={isModalOpen}
              onCancel={closeModal} // Close modal and clear video
              title={<p className="py-3 px-2">{blog.title}</p>} // Use blog.title directly, not setVideo
              className="modal"
              centered
              width={700}
              footer={null} // Remove footer
            >
              {videoSrc ? (
                <iframe
                  width="100%"
                  height="400"
                  src={videoSrc}
                  title={blog.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              ) : (
                <p>No video available</p>
              )}
            </Modal>
            {/* <div className="post-date-bg absolute top-2 left-2 bg-blue-600 text-white rounded-md p-2">
              <div className="post-date text-center">
                <span>{new Date().toLocaleDateString()}</span>
              </div>
            </div> */}
          </div>
          <div className="latest-news-content mt-4">
            <div className="entry-header">
              <h3 className="entry-title text-xl font-bold">{blog.title}</h3>
            </div>
            <div className="entry-content mt-2">
              <div
                className="text-gray-600 mb-2"
                dangerouslySetInnerHTML={{ __html: blog.description }}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="widget-area">
        <BlogLatest params={params} />
      </div>
    </div>
  );
};

export default BlogSingle;
