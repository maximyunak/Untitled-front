import { FC } from "react";
import { MyCheckbox } from "./MyCheckbox";
import { useAppDispatch, useAppSelector } from "@hooks";

interface IMyCheckList {
  category: string;
  active: boolean;
  onAdd: (category: string) => void;
}

export const MyCheckboxList: FC<IMyCheckList> = ({
  category,
  onAdd,
  active,
}) => {
  const { categories } = useAppSelector((state) => state.eventSlice);

  // const onAdd = () => {
  //   if (categories.includes(category)) {
  //     removeCategory(category);
  //   } else {
  //     setCategory(category);
  //   }
  // };

  // const active = categories.includes(category);
  return (
    <div className="flex gap-2 cursor-pointer" onClick={() => onAdd(category)}>
      <MyCheckbox active={active} />
      {category}
    </div>
  );
};
