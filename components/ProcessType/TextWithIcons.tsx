"use client";
import React, { useEffect, useState } from "react";

const TextWithIcons = () => {
  const [iconData, setIconData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch data from the API
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL}/wp-json/wp/v2/our-expertise?_fields=id,meta.icon,meta.title,meta.para`
        );
        const data = await response.json();

        // Map the API response to match the required format
        const formattedData = data.map((item: any) => ({
          imageUrl: item.meta.icon,
          title: item.meta.title,
          text: item.meta.para,
        }));

        setIconData(formattedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="px-4 md:px-8 lg:px-12 xl:px-16 py-10">
        <div className="flex flex-wrap justify-center">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              className="w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 px-3 mb-10"
              key={index}
            >
              <div className="animate-pulse">
                <div className="bg-gray-300 rounded-full w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 mx-auto mb-3 lg:mb-5"></div>
                <div className="bg-gray-300 rounded h-6 w-3/4 mx-auto mb-2"></div>
                <div className="bg-gray-300 rounded h-4 w-full mx-auto"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="px-5 md:px-10 lg:px-14 xl:px-20 py-12">
      <div className="mt-5 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-6">
        {iconData
          .slice()
          .reverse()
          .map((item: any, index) => (
            <div
              className="group relative flex flex-col items-center justify-cente px-2 pb-6 bg-white rounded-xl shadow-x transition-all duration-300 hover:scale-105 hover:shadow-2xl"
              key={index}
              style={{
                boxShadow:
                  "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px",
              }}
            >
              <div className=" my-8">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-14 md:w-16 lg:w-16 text-center group-hover:scale-110 transition-all duration-300"
                />
              </div>
              <div className="text-center uppercase text-templatePrimary text-sm md:text-lg lg:text-xl font-thin pb-2">
                <h3>{item.title}</h3>
              </div>
              {/* <div className="text-center text-templatePrimaryText text-sm md:text-base lg:text-lg leading-relaxed">
                <p>{item.text}</p>
              </div> */}
              <div className="absolute rounded-xl inset-0 bg-gradient-to-b from-transparent to-templatePrimar opacity-20 group-hover:opacity-40 transition-all duration-300"></div>
            </div>
          ))}
      </div>
      {/* <div className="text-with-icons__button mt-8 text-center">
        <button className="bg-templatePrimaryText text-white py-2 px-6 rounded-full text-lg shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-105">
          Explore More
        </button>
      </div> */}
    </div>
  );
};

export default TextWithIcons;
