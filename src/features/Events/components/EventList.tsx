import { MyButton } from '@shared/UI/MyButton';
import { MyFavorites } from '@shared/UI/MyFavorites';
import { FC } from 'react';

interface IEventListProps {
  title: string;
}

export const EventList: FC<IEventListProps> = ({ title }) => {
  return (
    <div className="w-full bg-[#303030] py-2 px-4 rounded-md flex justify-between">
      <div>
        <h1>{title}</h1>
      </div>
      <div className="flex flex-col gap-2">
        <MyFavorites />
      </div>
    </div>
  );
};
