"use client";
import { ColorPalette01 } from "@/lib/ColorPallete";
import React, { useEffect } from "react";

const ColorPallete = () => {
  useEffect(() => {
    document.documentElement.style.setProperty(
      "--template-primary",
      ColorPalette01.primary
    );
    document.documentElement.style.setProperty(
      "--template-primary-light",
      ColorPalette01.primaryLight
    );
    document.documentElement.style.setProperty(
      "--template-secondary",
      ColorPalette01.secondary
    );
    document.documentElement.style.setProperty(
      "--template-secondary-light",
      ColorPalette01.secondaryLight
    );
    document.documentElement.style.setProperty(
      "--template-heading",
      ColorPalette01.heading
    );
    document.documentElement.style.setProperty(
      "--template-text",
      ColorPalette01.text
    );
    document.documentElement.style.setProperty(
      "--template-gray",
      ColorPalette01.gray
    );
    document.documentElement.style.setProperty(
      "--template-dark",
      ColorPalette01.dark
    );
  }, []);

  return null;
};

export default ColorPallete;
