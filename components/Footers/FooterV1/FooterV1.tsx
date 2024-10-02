"use client";
import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, MapPin, PhoneCall, MailIcon } from "lucide-react";
import {
  headers,
  quickLinks,
  headerIcons,
  downloadStore,
  contactInfo,
} from "@/lib/headerData";
import { Input } from "antd";
import { TfiEmail } from "react-icons/tfi";

const FooterV1 = () => {
  const currentYear = new Date().getFullYear();
  const [searchValue, setSearchValue] = useState("");

  const handleInputChange = (e: any) => {
    setSearchValue(e.target.value);
  };
  return (
    <footer className="bg-white text-gray-800 border-t pt-5">
      <div className="px-4 pt-10 pb-5 mx-auto sm:px-6 lg:px-12 space-y-8">
        <div className="grid grid-cols-1 gap-8 xl:grid-cols-3">
          {/* About Section */}
          <div>
            <img
              className={`${headers.content ? "" : "m-auto xl:m-0"}`}
              src={headers.logo}
              alt=""
            />
            {headers.content ? (
              <p className="mt-5 text-base font-medium text-justify">
                {headers.content}
              </p>
            ) : (
              ""
            )}
          </div>

          {/* Speciality Section */}
          <div
            className={`grid grid-cols-1 gap-5 px-3 lg:px-10 lg:col-span-2 sm:grid-cols-2 lg:grid-cols-3 ${
              headers.content ? "xl:ml-0" : "xl:-ml-40"
            }`}
          >
            {quickLinks.map((item: any) => (
              <div className="space-y-2">
                <p className="font-bold text-xl">{item.linksHeading}</p>
                <div className="w-20 h-0.5 bg-primary rounded-full"></div>
                <ul className="flex flex-col mt-4 space-y-2 text-base">
                  {item.links.map((item: any) => (
                    <li key={item.id}>
                      <Link
                        className="flex items-center hover:text-primary gap-1 hover:ml-1 duration-200"
                        href={`/${item.url}`}
                      >
                        <ArrowRight size={16} />
                        <span>{item.heading}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            {/* Quick Links Section */}
            {/* <div className="space-y-2">
              <p className="font-bold text-xl">Quick Links</p>
              <div className="w-20 h-0.5 bg-primary rounded-full"></div>
              <ul className="flex flex-col mt-4 space-y-2 text-base">
                {ourCategories.categories.map((item: any) => (
                  <li key={item.id}>
                    <Link
                      className="flex items-center hover:text-primary gap-1 hover:ml-1 duration-200"
                      href={`/speciality/${item.url}`}
                    >
                      <ArrowRight size={16} />
                      <span>{item.heading}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div> */}

            {/* Contact Info Section */}
            {contactInfo.IscontactInfo && (
              <div className="space-y-2">
                <p className="font-bold text-xl">
                  {contactInfo.contactInfoName}
                </p>
                <div className="w-20 h-0.5 bg-primary rounded-full"></div>
                <div className="space-y-3 mt-4 text-sm">
                  {contactInfo.IsSubscribe && (
                    <div>
                      <p className="text-xs">{contactInfo.subscribe}</p>
                      <Input
                        suffix={<TfiEmail className="text-xl" />}
                        className="bg-white hover:bg-white focus-within:border-black focus-within:shadow-none focus-within:bg-white border-black border-solid border-b-2 border-x-0 border-t-0 my-3 rounded-none  outline-none focus:border-none focus:outline-none"
                        placeholder="Search"
                        type="text"
                        value={searchValue}
                        onChange={handleInputChange}
                      />
                    </div>
                  )}

                  {headerIcons.Isicon && (
                    <div className="w-full flex">
                      <ul className="flex gap-2 items-center  w-full md:w-1/2">
                        {headerIcons.icon.map(
                          (media) =>
                            media.url && (
                              <li key={media.id}>
                                <Link href={media.url}>
                                  <media.icon className="text-2xl" />
                                </Link>
                              </li>
                            )
                        )}
                      </ul>
                    </div>
                  )}
                  {downloadStore.storeImage && (
                    <div className="grid grid-cols-2 gap-2 py-3">
                      {downloadStore.storeImage.map((item) => (
                        <Link href={item.image}>
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
