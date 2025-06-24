"use client";
import React, { useEffect, useState, useRef } from "react";

interface BlogPost {
  ID: number;
  title: string;
  image: string;
  slug: string;
  description: string;
}

const BlogPostComponent = ({
  post,
  inView,
}: {
  post: BlogPost;
  inView: boolean;
}) => {
  return (
    <div className={` duration-1000 `}>
      <div
        className="rounded-xl"
        style={{ boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}
      >
        <div className="relative overflow-hidden bg-white rounded-lg shadow-lg">
          <a href={`/blogs/${post.slug}`} title={post.title}>
            <img
              src={post.image}
              alt="blog"
              className="w-full h-64 object-cover"
            />
          </a>
        </div>
        <div className="p-6">
          <h3 className="text-2xl font-bold mb-4 line-clamp-1">
            <a
              href={`/blogs/${post.slug}`}
              title={post.title}
              className="text-gray-800 hover:text-gray-600"
            >
              {post.title}
            </a>
          </h3>
          <p
            className="text-gray-700 mb-4 line-clamp-3"
            dangerouslySetInnerHTML={{ __html: post.description }}
          ></p>
          <a
            href={`/blogs/${post.slug}`}
            title="Read More"
            className="text-blue-500 hover:text-blue-700 font-semibold"
          >
            Read More
          </a>
        </div>
      </div>
    </div>
  );
};

const Blog = ({ title }: { title: string }) => {
  const bg = "./white bg.png";
  const itemsPerPage = 6;
  const [currentPage, setCurrentPage] = useState(1);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [inViewPosts, setInViewPosts] = useState<{ [key: number]: boolean }>(
    {}
  );
  const observerRefs = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const fetchBlogPosts = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `${process.env.BACKEND}/diseases?per_page=${itemsPerPage}&page=${currentPage}`
        );
        const data = await response.json();
        setBlogPosts(data.diseases);
        setTotalPages(data.pagination.total_pages);
      } catch (error) {
        console.error("Error fetching blog posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogPosts();
  }, [currentPage]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = parseInt(entry.target.getAttribute("data-id") || "0", 10);
          setInViewPosts((prev) => ({ ...prev, [id]: entry.isIntersecting }));
        });
      },
      { threshold: 0.2 }
    );

    observerRefs.current.forEach((ref) => ref && observer.observe(ref));

    return () => {
      observerRefs.current.forEach((ref) => ref && observer.unobserve(ref));
    };
  }, [blogPosts]);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const data = title === "home" ? blogPosts.slice(0, 3) : blogPosts;

  return (
    <div
    
      className={title === "home" ? "bg-white" : ""}
    >
      <div
        className={`container mx-auto px-4 ${
          title === "home" ? "py-10 pt-10 " : "py-16"
        }`}
      >
        <header className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl lg:text-5xl text-black tracking-tight uppercase">
            Blog
          </h1>
        </header>

        <div className="flex flex-wrap -mx-4">
          {loading
            ? Array.from({ length: title === "home" ? 3 : 6 }).map(
                (_, index) => (
                  <div key={index} className="w-full md:w-1/2 lg:w-1/3 p-4">
                    <div className="rounded-xl bg-gray-200 animate-pulse">
                      <div className="relative overflow-hidden bg-gray-300 h-64 rounded-lg"></div>
                      <div className="p-6">
                        <div className="h-6 bg-gray-300 rounded mb-4"></div>
                        <div className="h-4 bg-gray-300 rounded mb-2"></div>
                        <div className="h-4 bg-gray-300 rounded mb-2"></div>
                        <div className="h-4 bg-gray-300 rounded"></div>
                      </div>
                    </div>
                  </div>
                )
              )
            : data.map((post, index) => (
                <div
                  className="w-full md:w-1/2 lg:w-1/3 p-4"
                  key={post.ID}
                  data-id={index}
                  // ref={(el) => (observerRefs.current[index] = el)}
                >
                  <BlogPostComponent post={post} inView={inViewPosts[index]} />
                </div>
              ))}
        </div>

        {title === "home" && !loading && (
          <div className="flex justify-center mt-8">
            <a
              href="/blogs"
              className="flex items-center text-lg bg-[#232c77] text-white py-2 px-4 rounded-lg hover:bg-[#171f56] transition"
            >
              View More
            </a>
          </div>
        )}

        {title !== "home" && totalPages > 1 && !loading && (
          <div className="flex justify-between items-center mt-8 space-x-4">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`flex items-center py-2 px-4 text-lg rounded-lg transition ${
                currentPage === 1
                  ? "bg-gray-400 cursor-not-allowed text-white"
                  : "bg-[#171f56] text-white hover:bg-[#171f56]"
              }`}
            >
              Previous
            </button>
            <span className="text-lg">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`flex items-center py-2 px-4 text-lg rounded-lg transition ${
                currentPage === totalPages
                  ? "bg-gray-400 cursor-not-allowed text-white"
                  : "bg-[#171f56] text-white hover:bg-[#171f56]"
              }`}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Blog;
