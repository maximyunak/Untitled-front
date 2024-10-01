import React from 'react';

interface PreferencesTagProps {
  text: string;
  remove: (text: string) => void;
}

export const PreferencesTag: React.FC<PreferencesTagProps> = ({ text, remove }) => {
  const handleRemoveClick = () => {
    remove(text);
  };

  return (
    <div
      className="py-2 px-3 bg-customPurple rounded-xl cursor-pointer text-base hover:opacity-85 transition"
      onClick={handleRemoveClick}
    >
      <span className="text-green-400">#</span> {text}
    </div>
  );
};
