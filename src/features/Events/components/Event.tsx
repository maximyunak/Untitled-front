import React from 'react';
import { MyTitle } from '@shared/UI/MyTitle';
import { IEvent } from '@shared/types/IEvent';
import { MyFavorites } from '@shared/UI/MyFavorites';

interface IEventProps {
  eventData: IEvent;
}

export const Event: React.FC<IEventProps> = ({ eventData }) => {
  return (
    <div className="w-[49%] bg-[#393939] p-4 rounded-xl">
      <div className="flex justify-between items-center">
        <div>
          <MyTitle text={'xl'}>{eventData.title}</MyTitle>
          <p className="text-xs font-light">3 hours ago</p>
        </div>
        <MyFavorites />
      </div>
      <p className="mt-4 text-base max-w-[600px]">{eventData.description}</p>

      <div className="mt-4 w-full">
        {/* <img src={img} alt="" className="rounded-xl w-1/2" /> */}
      </div>

      <div className="mt-4 flex justify-between">
        <div className="alegreya flex gap-2 max-w-[150px]">
          {eventData.eventTypes.map((type, id) => (
            <span className="italic text-customPurple" key={`${type}_${id}`}>
              #{type}
            </span>
          ))}
        </div>
        <div className="alegreya italic">{eventData.country}</div>
      </div>
    </div>
  );
};
