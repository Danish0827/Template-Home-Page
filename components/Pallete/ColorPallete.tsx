"use client";
import { ColorPalette01 } from "@/lib/ColorPallete";
import React, { useEffect } from "react";

const ColorPallete = () => {
  useEffect(() => {
    const colorVariables = {
      "--template-primary": ColorPalette01.primary,
      "--template-primary-light": ColorPalette01.primaryLight,
      "--template-secondary": ColorPalette01.secondary,
      "--template-secondary-light": ColorPalette01.secondaryLight,
      "--template-heading": ColorPalette01.heading,
      "--template-text": ColorPalette01.text,
      "--template-gray": ColorPalette01.gray,
      "--template-dark": ColorPalette01.dark,
    };

    Object.entries(colorVariables).forEach(([key, value]) => {
      document.documentElement.style.setProperty(key, value);
    });
  }, []);

  return null;
};

export default ColorPallete;
