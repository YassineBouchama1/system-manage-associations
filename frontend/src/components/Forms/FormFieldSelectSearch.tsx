'use client'
import React, { useState, useEffect } from "react";

type DataList = { [key: string]: string };


interface SelectMenuProps {
  dataList: DataList;
  defaultSelectedKey?: string | null;
  nameInput?: string;
  onSelectChange?: (value: string | null) => void;
}



export default  function FormFieldSelectSearch({
  dataList,
  nameInput,
  defaultSelectedKey,
  onSelectChange,
}: SelectMenuProps) {
  const [state, setState] = useState<boolean>(false);
  const [filter, setFilter] = useState<string>("");
  const [selectedKey, setSelectedKey] = useState<string | null>(
    defaultSelectedKey || null
  );
  const [selectedLabel, setSelectedLabel] = useState<string | null>(null);

  useEffect(() => {
    if (defaultSelectedKey) {
      setSelectedKey(defaultSelectedKey);
      setSelectedLabel(dataList[defaultSelectedKey]);
    }
  }, [defaultSelectedKey, dataList]);

  const toggle = () => {
    setState(!state);
    setFilter("");
  };

  const close = () => {
    setState(false);
  };

  const select = (value: string, key: string) => {
    if (selectedKey === key) {
      setSelectedLabel(null);
      setSelectedKey(null);
    } else {
      setSelectedLabel(value);
      setSelectedKey(key);
      setState(false);

      // if onSelectchange provied give it value
       if (onSelectChange) {
         
         onSelectChange(key);
       }
    }
  };

  const isSelected = (key: string) => {
    return selectedKey === key;
  };

  const getList = () => {
    if (filter === "") {
      return Object.entries(dataList);
    }
    const filtered = Object.entries(dataList).filter(([key, value]) =>
      value.toLowerCase().includes(filter.toLowerCase())
    );
    return filtered;
  };

  return (
    <div className="relative text-black my-6">
      <label id="selectfield"
      className="mb-4"
      >{nameInput && nameInput}</label>
      <input
        type="text"
        value={selectedLabel || ""}
        name={nameInput && nameInput}
        id="selectfield"
        className="hidden"
      />
      <span
        className="inline-block w-full rounded-md shadow-sm"
        onClick={() => {
          toggle();
          setTimeout(() => document.getElementById("filterinput")?.focus(), 0);
        }}
      >
        <button className="relative z-0 w-full py-2 pl-3 pr-10 text-left transition duration-150 ease-in-out bg-white border border-gray-300 rounded-md cursor-default focus:outline-none focus:shadow-outline-blue focus:border-blue-300 sm:text-sm sm:leading-5">
          <span className="block truncate">
            {selectedLabel || "Please Select"}
          </span>
          <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
            <svg
              className="w-5 h-5 text-gray-400"
              viewBox="0 0 20 20"
              fill="none"
              stroke="currentColor"
            >
              <path
                d="M7 7l3-3 3 3m0 6l-3 3-3-3"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </button>
      </span>

      {state && (
        <div className="absolute z-10 w-full mt-1 bg-white rounded-md shadow-lg p-2">
          <input
            type="text"
            className="w-full rounded-md py-1 px-2 mb-1 border border-gray-400"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            id="filterinput"
          />
          <ul className="py-1 overflow-auto text-base leading-6 rounded-md shadow-xs max-h-60 focus:outline-none sm:text-sm sm:leading-5">
            {getList().map(([key, value]) => (
              <li
                key={key}
                onClick={() => select(value, key)}
                className={`relative py-1 pl-3 mb-1 text-gray-900 select-none pr-9 hover:bg-gray-100 cursor-pointer rounded-md ${
                  isSelected(key) ? "bg-gray-100" : ""
                }`}
              >
                <span className="block font-normal truncate">{value}</span>
                {isSelected(key) && (
                  <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-gray-700">
                    <svg
                      className="h-4 w-4"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}