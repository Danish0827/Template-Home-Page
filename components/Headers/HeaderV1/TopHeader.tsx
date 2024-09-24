"use client";
import { headerIcons, headerMedia } from "@/lib/headerData";
import Link from "next/link";
import React from "react";

const TopHeader = () => {
  const { Ismedia, media } = headerMedia;
  const { Isicon, icon } = headerIcons;
  return (
    <>
      <div className="bg-white text-templateDark px-4 lg:px-10 py-2 hidden md:flex flex-wrap items-center border-b">
        {Ismedia && (
          <ul className="flex gap-3 items-center w-full md:w-1/2">
            {media.map((media) => (
              <li className="text-[13px]" key={media.id}>
                <Link href={media.url}>{media.heading}</Link>
              </li>
            ))}
          </ul>
        )}
        {Isicon && (
          <div className="w-full md:w-1/2 flex justify-end">
            <ul className="flex gap-2 items-center md:justify-end w-full md:w-1/2">
              {icon.map(
                (media) =>
                  media.url && (
                    <li key={media.id}>
                      <Link href={media.url}>
                        <media.icon />
                      </Link>
                    </li>
                  )
              )}
            </ul>
          </div>
        )}
      </div>
    </>
  );
};

export default TopHeader;
