"use client";

import { useState } from "react";

export default function FloatingLabelInput({
  id,
  label,
  type = "text",
  required = false,
  onValueChange,
}) {
  const [isFocused, setIsFocused] = useState(false);
  const [hasValue, setHasValue] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const handleFocus = () => setIsFocused(true);
  const handleBlur = (e) => {
    setIsFocused(false);
    setHasValue(e.target.value !== "");
  };

  //Handlers
  const handleChange = (e) => {
    const newValue = e.target.value;
    setHasValue(newValue !== "");
    setInputValue(newValue);
    if (onValueChange) {
      onValueChange(newValue);
    }
  };

  return (
    <div className="relative mb-5 w-[500px]">
      <input
        id={id}
        type={type}
        required={required}
        className="peer w-full border-b border-[#979dac] bg-transparent px-0 py-2 text-gray-900 placeholder-transparent focus:border-[#f48c06] focus:outline-none"
        placeholder=" "
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChange={handleChange}
        value={inputValue}
      />
      <label
        htmlFor={id}
        className={`absolute left-0 top-2 text-lg transition-all duration-200 ease-in-out
          ${
            isFocused || hasValue
              ? "text-[#f48c06] text-sm -translate-y-6"
              : "text-[#979dac]"
          }
          peer-placeholder-shown:text-lg 
          peer-focus:text-[#f48c06]
          peer-focus:text-sm 
          peer-focus:-translate-y-6`}
      >
        {label}
      </label>
    </div>
  );
}
