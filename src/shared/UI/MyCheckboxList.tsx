import { FC } from 'react';
import { MyCheckbox } from './MyCheckbox';
import { useAppDispatch, useAppSelector } from '@hooks';
import { removeCategory, setCategory } from '@features/Events/store/eventSlice';

interface IMyCheckList {
  category: string;
  active: boolean;
}

export const MyCheckboxList: FC<IMyCheckList> = ({ category }) => {
  const { categories } = useAppSelector((state) => state.eventSlice);
  const dispatch = useAppDispatch();

  const onAdd = () => {
    if (categories.includes(category)) {
      dispatch(removeCategory(category));
    } else {
      dispatch(setCategory(category));
    }
  };

  const active = categories.includes(category);
  return (
    <div className="flex gap-2 cursor-pointer" onClick={onAdd}>
      <MyCheckbox active={active} />
      {category}
    </div>
  );
};
