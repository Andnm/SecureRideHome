import React from "react";

interface InputTextField {
  label: string;
  name: string;
  value: any;
  handleOnChange: any;
  required: boolean
}

const InputTextField: React.FC<InputTextField> = ({
  label,
  name,
  value,
  handleOnChange,
  required,
}) => {
  return (
    <div className="relative ">
      <p className="bg-white pt-0 pr-2 pb-0 pl-2 -mt-3 mr-0 mb-0 ml-2 font-medium text-gray-600 absolute">
        {label} {required && <span className="text-red-700">*</span>}
      </p>
      <input
        name={name}
        value={value}
        onChange={handleOnChange}
        type="text"
        className="border placeholder-gray-400 focus:outline-none
focus:border-black w-full pt-4 pr-4 pb-4 pl-4 mt-2 mr-0 mb-0 ml-0 text-base block bg-white
border-gray-300 rounded-md"
      />
    </div>
  );
};

export default InputTextField;
