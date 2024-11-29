"use client";
import React, { useEffect, useState } from "react";

const ColorPallete = () => {
  const [colorPalette, setColorPalette] = useState<any>(null);

  useEffect(() => {
    const fetchColorPalettes = async () => {
      try {
        const response = await fetch(
          "https://bovinosbck.demo-web.live/wp-json/wp/v2/color-palette?_fields=id,title,meta"
        );
        const data = await response.json();

        // Filter and find the first palette with "do-want-to-use-this-color-palette.yes" === "true"
        const palette = data.find(
          (item: any) =>
            item.meta["do-want-to-use-this-color-palette"]?.yes === "true"
        );

        if (palette) {
          setColorPalette({
            primary: palette.meta.primary,
            primarylight: palette.meta.primarylight,
            secondary: palette.meta.secondary,
            secondarylight: palette.meta.secondarylight,
            primaryheading: palette.meta.primaryheading || "#000", // Fallback if empty
            secondaryheading: palette.meta.secondaryheading || "#000",
            primarytext: palette.meta.primarytext || "#000",
            secondarytext: palette.meta.secondarytext || "#000",
            dark: palette.meta.dark || "#000",
            white: palette.meta.white || "#fff",
          });
        }
      } catch (error) {
        console.error("Error fetching color palettes:", error);
      }
    };

    fetchColorPalettes();
  }, []);

  useEffect(() => {
    if (colorPalette) {
      const colorVariables = {
        "--template-primary": colorPalette.primary,
        "--template-primary-light": colorPalette.primarylight,
        "--template-secondary": colorPalette.secondary,
        "--template-secondary-light": colorPalette.secondarylight,
        "--template-primary-heading": colorPalette.primaryheading,
        "--template-secondary-heading": colorPalette.secondaryheading,
        "--template-primary-text": colorPalette.primarytext,
        "--template-secondary-text": colorPalette.secondarytext,
        "--template-white": colorPalette.white,
        "--template-dark": colorPalette.dark,
      };

      Object.entries(colorVariables).forEach(([key, value]) => {
        document.documentElement.style.setProperty(key, value);
      });
    }
  }, [colorPalette]);

  return null; // No visible UI required
};

export default ColorPallete;
