"use client";
import LanguageSwitcher from "@/hooks/LanguageSwitcher";
import { headerIcons, headerMedia } from "@/lib/headerData";
import Link from "next/link";
import React from "react";

const TopHeader = () => {
  const { Ismedia, media } = headerMedia;
  const { Isicon, icon } = headerIcons;
  return (
    <>
      <div className="bg-white text-templateDark px-4 lg:px-10 md:py-2 block md:flex flex-wrap justify-between items-center border-b">
        {/* {Ismedia && (
          <ul className="flex gap-3 items-center w-full md:w-1/2">
            {media.map((media) => (
              <li className="text-[13px]" key={media.id}>
                <Link href={media.url}>{media.heading}</Link>
              </li>
            ))}
          </ul>
        )} */}
        <div className="hidden md:block">
          {Isicon && (
            <ul className="flex gap-2 items-center  w-full md:w-1/2">
              {icon.map(
                (media) =>
                  media.url && (
                    <li key={media.id}>
                      <Link href={media.url}>
                        <media.icon className="text-templatePrimary text-xl" />
                      </Link>
                    </li>
                  )
              )}
            </ul>
          )}
        </div>
        <div className="w-full md:w-1/2 flex justify-center md:justify-end">
          <LanguageSwitcher />
        </div>
      </div>
    </>
  );
};

export default TopHeader;
