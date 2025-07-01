"use client";
import React, { useEffect, useState } from "react";

interface Disease {
  ID: number;
  title: string;
  image: string;
  slug: string;
}

const BlogLatestSkeleton = () => (
  <aside className="widget bg-white p-4 rounded-md shadow-md animate-pulse">
    <div className="space-y-5">
      {[...Array(5)].map((_, index) => (
        <div key={index} className="flex gap-4 items-start">
          <div className="w-16 h-16 bg-gray-300 rounded-lg"></div>
          <div className="flex-1 space-y-2">
            <div className="h-4 bg-gray-300 rounded-md w-3/4"></div>
            <div className="h-4 bg-gray-300 rounded-md w-1/4"></div>
          </div>
        </div>
      ))}
    </div>
  </aside>
);

const BlogLatest = ({ params }: any) => {
  const [diseases, setDiseases] = useState<Disease[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${process.env.BACKEND}/diseases?per_page=1000`)
      .then((response) => response.json())
      .then((data) => {
        setDiseases(data.diseases);
        setLoading(false);
      })
      .catch((error) => console.error("Error fetching diseases:", error));
  }, []);

  if (loading) {
    return <BlogLatestSkeleton />;
  }

  return (
    <aside className="widget bg-white p-4 rounded-md shadow-md">
      <h3 className="text-2xl font-semibold mb-4">Patients Education</h3>
      <div className="tab-content">
        <div className="latest-content space-y-5">
          {diseases.map((disease) => (
            <div
              key={disease.ID}
              className={`flex gap-4 items-center ${
                params === disease.slug ? "bg-gray-200" : "bg-white"
              } p-2 rounded-md`}
            >
              <a href={`/blogs/${disease.slug}`}>
                <img
                  className="w-16 h-16 rounded-lg blog-lg object-cover"
                  src={disease.image}
                  alt={disease.title}
                />
              </a>
              <div className="flex-1">
                <h5
                  className={`text-md lg:text-lg font-bold ${
                    params === disease.slug ? "text-[#232c77]" : "text-black"
                  }`}
                >
                  <a href={`/blogs/${disease.slug}`}>{disease.title}</a>
                </h5>
                
                {/* <span className="text-sm text-gray-500 mt-1 block">
                  <i className="pi pi-calendar mr-1"></i>{new Date().toLocaleDateString()}
                </span> */}
              </div>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default BlogLatest;
