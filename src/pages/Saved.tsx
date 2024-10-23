import { Event } from "@features/Events";
import { Loader } from "@features/Loader/Loader";
import { eventApi } from "@shared/api/eventApi";
import { MyTitle } from "@shared/UI/MyTitle";
import React from "react";

export const Saved = () => {
  const { data: savedEvents } = eventApi.useGetSavedEventQuery();

  return (
    <div>
      <MyTitle text="xl">Your Saved Events</MyTitle>
      <span className="h-[1px] my-4 w-full block bg-white opacity-70"></span>

      <div className="flex flex-col gap-4">
        {savedEvents ? (
          savedEvents.length > 0 ? (
            savedEvents.map((event, id) => (
              <Event
                key={`${event.title}_${id}`}
                index={id}
                eventData={event}
                saved={true}
              />
            ))
          ) : (
            <div className="text-center">
              <MyTitle>No Events</MyTitle>
            </div>
          )
        ) : (
          <Loader />
        )}
      </div>
    </div>
  );
};
