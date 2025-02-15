import { EyeIcon, EyeSlashIcon } from "@heroicons/react/16/solid";
import { useState } from "react";

export function FormInput({
  type,
  name,
  label,
  placeholder,
  error,
}: {
  type: string;
  name: string;
  label: string;
  placeholder: string;
  error: string;
}) {
  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };
  return (
    <div className="mb-4">
      <label
        className="block text-gray-700 text-sm font-bold md:text-base lg:text-lg xl:text-xl"
        htmlFor={label}
      >
        {label}
      </label>
      <div className="relative">
        <input
          className="shadow border rounded w-full p-2 text-gray-700 leading-3 focus:outline-none focus:shadow-outline text-xs md:text-sm lg:text-base xl:text-lg"
          id={label}
          type={
            type === "password" ? (passwordVisible ? "text" : "password") : type
          }
          name={name}
          placeholder={placeholder}
        />

        {type === "password" ? (
          <button
            className="absolute right-0 top-2 px-2 text-gray-700 hover:text-gray-900 "
            type="button"
            onClick={togglePasswordVisibility}
          >
            {passwordVisible ? (
              <EyeIcon className="w-5 md:w-6 lg:w-7 xl:w-8" />
            ) : (
              <EyeSlashIcon className="w-5 md:w-6 lg:w-7 xl:w-8" />
            )}
          </button>
        ) : (
          ""
        )}
      </div>
      {error && (
        <p className="text-red-500 text-xs leading-3 mt-2 md:text-sm lg:text-base xl:text-lg">
          {error}
        </p>
      )}
    </div>
  );
}
