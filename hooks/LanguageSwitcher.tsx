"use client";
import React from "react";
import { Dropdown, Menu, Button } from "antd";
import { DownOutlined } from "@ant-design/icons";
import useLanguageSwitcher from "@/hooks/useLanguageSwitcher";

const LanguageSwitcher = () => {
  const { currentLanguage, switchLanguage, languageConfig } =
    useLanguageSwitcher();

  if (!languageConfig) {
    return null;
  }

  const menu = (
    <Menu
      onClick={({ key }) => switchLanguage(key)()}
      items={languageConfig.languages.map((lang) => ({
        key: lang.name,
        label: (
          <span
            className={`block ${
              currentLanguage === lang.name
                ? "font-semibold text-blue-600"
                : "text-gray-700"
            }`}
          >
            {lang.title}
          </span>
        ),
      }))}
    />
  );

  const currentLanguageTitle =
    languageConfig.languages.find((lang) => lang.name === currentLanguage)
      ?.title || "Select Language";

  return (
    <div className="flex justify-center items-center py-4 lg:py-1">
      <Dropdown overlay={menu} trigger={["click"]}>
        <Button className="flex items-center space-x-2 bg-gray-100 border border-templatePrimary text-templatePrimary py-2 px-4 rounded-lg shadow-sm hover:bg-blue-50 hover:border-templatePrimary hover:text-templatePrimary">
          <span style={{ marginTop: "-3px" }}>{currentLanguageTitle}</span>
          <DownOutlined />
        </Button>
      </Dropdown>
    </div>
  );
};

export default LanguageSwitcher;
