"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Input } from "antd";
import { TfiEmail } from "react-icons/tfi";
import {
  headers,
  quickLinks,
  headerIcons,
  downloadStore,
  contactInfo,
} from "@/lib/headerData";

const FooterV1 = () => {
  const currentYear = new Date().getFullYear();
  const [searchValue, setSearchValue] = useState("");

  const handleInputChange = (e: any) => {
    setSearchValue(e.target.value);
  };

  const [footerData, setFooterData] = useState<any[]>([]);

  // Fetch the data inside useEffect
  useEffect(() => {
    const fetchFooterData = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL}/wp-json/wp/v2/sitefooter?_fields=id,meta.tick-to-show-on-site,title,meta.pages-name`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        // console.log(data, "footer data");

        setFooterData(data); // Set the fetched data to state
      } catch (error) {
        console.error("Error fetching footer data:", error);
      }
    };

    fetchFooterData();
  }, []);

  return (
    <footer className="bg-white text-gray-800 border-t pt-5">
      <div className="px-4 pt-10 pb-5 mx-auto sm:px-6 lg:px-12 space-y-8">
        <div className="grid grid-cols-1 gap-3 xl:grid-cols-3">
          {/* About Section */}
          <div>
            <img
              className={`${headers.content ? "w-52" : "m-auto xl:m-0 w-48"}`}
              src={headers.logo}
              alt=""
            />
            {headers.content && (
              <p className="text-templatePrimaryText text-base font-medium text-left">
                {headers.content}
              </p>
            )}
          </div>

          {/* Speciality Section */}
          <div
            className={`grid grid-cols-1 gap-5 px-3 lg:px-10 lg:col-span-2 sm:grid-cols-2 lg:grid-cols-3 ${
              headers.content ? "xl:ml-0" : "xl:-ml-40"
            }`}
          >
            {footerData
              .slice()
              .reverse()
              .map((item) => (
                <div key={item.id} className="space-y-2">
                  <p className="text-templatePrimaryHeading font-bold text-xl">
                    {item.title.rendered}{" "}
                    {/* Use the appropriate path if applicable */}
                  </p>
                  <div className="w-20 h-0.5 bg-primary rounded-full"></div>
                  <ul className="flex flex-col mt-4 space-y-2 text-base">
                    {Object.values(item.meta["pages-name"] || {}).map(
                      (linkItem: any, index) => (
                        <li key={index}>
                          <Link
                            className="flex items-center hover:text-templatePrimary gap-2 hover:ml-1 duration-200"
                            href={`/${linkItem["page-slug"]}`} // Update to the correct path for URLs
                          >
                            <ArrowRight
                              className="text-templatePrimary"
                              size={16}
                            />
                            <span className="text-templatePrimaryText hover:text-templatePrimary">
                              {linkItem["page-title"]}{" "}
                              {/* Update to the correct property for the heading */}
                            </span>
                          </Link>
                        </li>
                      )
                    )}
                  </ul>
                </div>
              ))}

            {/* Contact Info Section */}
            {contactInfo.IscontactInfo && (
              <div className="space-y-2">
                <p className="text-templatePrimaryHeading font-bold text-xl">
                  {contactInfo.contactInfoName}
                </p>
                <div className="w-20 h-0.5 bg-primary rounded-full"></div>
                <div className="space-y-3 mt-4 text-sm">
                  {contactInfo.IsSubscribe && (
                    <div>
                      <p className="text-templatePrimaryText text-xs">
                        {contactInfo.subscribe}
                      </p>
                      <Input
                        suffix={<TfiEmail className="text-xl" />}
                        className="bg-white hover:bg-white focus-within:border-black focus-within:shadow-none focus-within:bg-white border-black border-solid border-b-2 border-x-0 border-t-0 my-3 rounded-none outline-none"
                        placeholder="Search"
                        type="text"
                        value={searchValue}
                        onChange={handleInputChange}
                      />
                    </div>
                  )}

                  {headerIcons.Isicon && (
                    <div className="w-full flex">
                      <ul className="flex gap-2 items-center w-full md:w-1/2">
                        {headerIcons.icon.map((media) => (
                          <li key={media.id}>
                            <Link href={media.url}>
                              <media.icon className="text-2xl" />
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {downloadStore.storeImage && (
                    <div className="grid grid-cols-2 gap-2 py-3">
                      {downloadStore.storeImage.map((item, index) => (
                        <Link key={`${item.image}-${index}`} href={item.image}>
                          <img src={item.image} alt="Download Store" />
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
        <hr />
        <p className="text-base text-center">
          © {currentYear} {headers.brandName}
        </p>
      </div>
    </footer>
  );
};

export default FooterV1;
