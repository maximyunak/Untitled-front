import { ChangeEvent, FC } from 'react';

interface IMyInput {
  value?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void; // Changed type here
  placeholder?: string;
}

export const MyInput: FC<IMyInput> = ({ value, onChange, placeholder }) => {
  return (
    <input
      type="text"
      className="w-full border border-opacity-70 border-white py-1 px-3 bg-[#282828] rounded-lg placeholder:text-sm hover:bg-[#272727] focus:border focus:border-customPurple transition-colors mt-1 duration-300 text-sm"
      placeholder={placeholder}
      value={value}
      onChange={onChange} // No need for extra argument here
    />
  );
};
