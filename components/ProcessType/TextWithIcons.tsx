"use client";
import React, { useEffect, useState } from "react";

const TextWithIcons = () => {
  const [iconData, setIconData] = useState([]);

  useEffect(() => {
    // Fetch data from the API
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://bovinosbck.demo-web.live/wp-json/wp/v2/our-expertise?_fields=id,meta.icon,meta.title,meta.para"
        );
        const data = await response.json();

        // Map the API response to match the required format
        const formattedData = data.map((item:any) => ({
          imageUrl: item.meta.icon,
          title: item.meta.title,
          text: item.meta.para,
        }));

        setIconData(formattedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="px-4 md:px-8 lg:px-12 xl:px-16 py-10">
      <div className="flex flex-wrap justify-center ">
        {iconData.slice().reverse().map((item:any, index) => (
          <div
            className="w-full md:w-1/2 lg:w-1/4 xl:w-1/5 px-3 mb-10"
            key={index}
          >
            <div className="text-with-icons__block-icon">
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-24 mx-auto mb-5"
              />
            </div>
            <div className="text-center uppercase text-templatePrimaryText text-2xl pb-2">
              <h3>{item.title}</h3>
            </div>
            <div className="text-center text-templatePrimaryText text-lg">
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
