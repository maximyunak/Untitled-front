import { Event } from '@features/Events';
import { MyTitle } from '@shared/UI/MyTitle';
import { eventApi } from '@shared/api/eventApi';
import React from 'react';

export const Profile = () => {
  const { data: myEvents } = eventApi.useFetchMyEventsQuery();
  console.log(myEvents);

  return (
    <div>
      <MyTitle text="xl">Your Events</MyTitle>
      <span className="h-[1px] my-4 w-full block bg-white opacity-70"></span>

      <div className="flex flex-col gap-4">
        {myEvents
          ? myEvents.map((event, id) => <Event key={`${event.title}_${id}`} eventData={event} />)
          : "Нou haven't created events yet"}
      </div>
    </div>
  );
};
