import React from "react";
import { useAppDispatch } from "../../../../../store/hooks";
import { removePreference } from "../../../store/userSlice";

interface PreferencesTagProps {
  text: string;
}

export const PreferencesTag: React.FC<PreferencesTagProps> = ({ text }) => {
  const dispatch = useAppDispatch(); // Для отправки экшенов

  const handleRemoveClick = () => {
    dispatch(removePreference(text));
  };

  return (
    <div
      className="py-2 px-3 bg-customPurple rounded-xl cursor-pointer"
      onClick={handleRemoveClick}
    >
      <span className="text-green-400">#</span> {text}
    </div>
  );
};
