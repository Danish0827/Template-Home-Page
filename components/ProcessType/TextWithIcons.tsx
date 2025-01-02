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
    <div className="px-4 md:px-8 lg:px-12 xl:px-16 py-10">
      <div className="flex flex-wrap justify-center ">
        {iconData
          .slice()
          .reverse()
          .map((item: any, index) => (
            <div
              className="w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 px-3 mb-10"
              key={index}
            >
              <div className="text-with-icons__block-icon">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-12 md:w-16 lg:w-20 mx-auto mb-3 lg:mb-5"
                />
              </div>
              <div className="text-center uppercase text-templatePrimaryText text-base px-2 md:text-xl lg:text-2xl pb-1 lg:pb-2 leading-5">
                <h3>{item.title}</h3>
              </div>
              <div className="text-center text-templatePrimaryText text-xs md:text-base lg:text-lg">
                <p>{item.text}</p>
              </div>
            </div>
          ))}
      </div>
      <div className="text-with-icons__button"></div>
    </div>
  );
};

export default TextWithIcons;
