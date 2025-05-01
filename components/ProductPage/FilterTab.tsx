"use client";
import { Drawer } from "antd";
import React, { useState, useEffect, useRef } from "react";
import { SlEqualizer } from "react-icons/sl";
import { IoIosArrowDown, IoIosArrowUp, IoIosClose } from "react-icons/io";
import { filters } from "@/lib/headerData";
import { gsap } from "gsap";
import { useRouter, useSearchParams } from "next/navigation";

const FilterTab = ({ count }: any) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [open, setOpen] = useState(false);
  const [openSection, setOpenSection] = useState<string | null>(null);
  const [selectedOptions, setSelectedOptions] = useState<
    Record<string, string[]>
  >({
    availability: [],
    size: [],
    color: [],
  });

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    const initialSelections: Record<string, string[]> = {
      availability: [],
      size: [],
      color: [],
    };

    Object.keys(initialSelections).forEach((key) => {
      const values = params.getAll(key);
      if (values.length) {
        initialSelections[key] = values;
      }
    });

    setSelectedOptions(initialSelections);
  }, []);

  const showDrawer = () => setOpen(true);
  const onClose = () => setOpen(false);
  const animationRef = useRef(null);

  const toggleSection = (section: string) =>
    setOpenSection(openSection === section ? null : section);

  const updateURLParams = (
    section: string,
    value: string,
    isAdding: boolean
  ) => {
    const params = new URLSearchParams(searchParams.toString());
    const existing = params.getAll(section);

    if (isAdding) {
      if (!existing.includes(value)) {
        params.append(section, value);
      }
    } else {
      const updated = existing.filter((item) => item !== value);
      params.delete(section);
      updated.forEach((item) => params.append(section, item));
    }

    router.push(`?${params.toString()}`, { scroll: false });
  };

  const handleCheckboxChange = (section: string, value: string) => {
    setSelectedOptions((prev) => {
      const isSelected = prev[section].includes(value);
      const updatedSection = isSelected
        ? prev[section].filter((item) => item !== value)
        : [...prev[section], value];

      updateURLParams(section, value, !isSelected);

      return {
        ...prev,
        [section]: updatedSection,
      };
    });
  };

  const removeSelectedOption = (section: string, value: string) => {
    setSelectedOptions((prev) => {
      updateURLParams(section, value, false);
      return {
        ...prev,
        [section]: prev[section].filter((item) => item !== value),
      };
    });
  };

  // Animate on drawer open
  useEffect(() => {
    if (open) {
      gsap.to(".appear-animation", {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power4.out",
        delay: 0.2,
      });
    } else {
      gsap.to(".appear-animation", {
        opacity: 0,
        y: 60,
        duration: 1,
        ease: "power4.out",
      });
    }
  }, [open]);

  const selectedOptions1 = selectedOptions.availability.length;
  const selectedOptions2 = selectedOptions.color.length;
  const selectedOptions3 = selectedOptions.size.length;
  const contsv = selectedOptions1 + selectedOptions2 + selectedOptions3;

  return (
    <>
      <div
        onClick={showDrawer}
        className="flex gap-2 items-center border border-solid py-3 px-6 cursor-pointer bg-white rounded-md transition-shadow"
      >
        <SlEqualizer className="rotate-90" />
        <p>Filter {contsv > 0 ? (contsv) : " "}</p>
      </div>

      <Drawer
        title={<p className="text-5xl appear-animation">FILTER</p>}
        placement="left"
        onClose={onClose}
        open={open}
      >
        <div className="w-full bg-white">
          {/* Selected Filters Display */}
          <div className="mb-4">
            {Object.entries(selectedOptions).flatMap(([key, values]) =>
              values.map((value) => {
                const label =
                  filters
                    .find((f) => f.key === key)
                    ?.options.find((opt: any) => opt.value === value)?.label ||
                  value;

                return (
                  <div
                    key={`${key}-${value}`}
                    className="flex items-center justify-between bg-black p-2 rounded-md mb-2"
                  >
                    <span className="text-gray-100 font-bold text-sm">
                      {label}
                    </span>
                    <IoIosClose
                      className="text-gray-100 text-lg cursor-pointer"
                      onClick={() => removeSelectedOption(key, value)}
                    />
                  </div>
                );
              })
            )}
          </div>

          <form className="space-y-6 appear-animation">
            {filters.map((filter) => (
              <div key={filter.key} className="border-b pb-4">
                <button
                  type="button"
                  className="w-full flex justify-between items-center text-lg font-semibold py-1 focus:outline-none"
                  onClick={() => toggleSection(filter.key)}
                >
                  {filter.label}
                  {openSection === filter.key ? (
                    <IoIosArrowUp className="text-gray-500" />
                  ) : (
                    <IoIosArrowDown className="text-gray-500" />
                  )}
                </button>

                {openSection === filter.key && (
                  <div className="pt-2 space-y-3">
                    {filter.options.map((option: any, index) => (
                      <div key={index}>
                        {option.type === "checkbox" ? (
                          <label className="flex items-center">
                            <input
                              type="checkbox"
                              checked={selectedOptions[filter.key].includes(
                                option.value
                              )}
                              onChange={() =>
                                handleCheckboxChange(filter.key, option.value)
                              }
                              className="form-checkbox h-5 w-5 text-blue-600"
                            />
                            {option.color && (
                              <span
                                className="ml-2 block w-6 h-6 rounded-full"
                                style={{ backgroundColor: option.color }}
                                title={option.label}
                              />
                            )}
                            <span className="ml-2 text-gray-700">
                              {option.label}
                            </span>
                          </label>
                        ) : option.type === "range" ? (
                          <>
                            <div className="flex justify-between">
                              <span className="text-gray-600">
                                {option.labels?.min}
                              </span>
                              <span className="text-gray-600">
                                {option.labels?.max}
                              </span>
                            </div>
                            <input
                              type="range"
                              min={option.min}
                              max={option.max}
                              className="w-full mt-2 h-2 bg-gray-300 rounded-lg cursor-pointer"
                            />
                          </>
                        ) : null}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </form>
        </div>
      </Drawer>
    </>
  );
};

export default FilterTab;
