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
        className="block text-gray-700 text-sm font-bold mb-2"
        htmlFor={label}
      >
        {label}
      </label>
      <div className="relative">
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
              <EyeIcon className="w-6" />
            ) : (
              <EyeSlashIcon className="w-6" />
            )}
          </button>
        ) : (
          ""
        )}
      </div>
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
    </div>
  );
}
