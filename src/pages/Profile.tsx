import { Event } from "@features/Events";
import { Loader } from "@features/Loader/Loader";
import { skipToken } from "@reduxjs/toolkit/query";
import { MyTitle } from "@shared/UI/MyTitle";
import { authApi } from "@shared/api/authApi";
import { eventApi } from "@shared/api/eventApi";
import { useUser } from "@shared/hooks/useUser";
import { useEffect, useLayoutEffect } from "react";
import { useNavigate } from "react-router-dom";

export const Profile = () => {
  const { data: myEvents } = eventApi.useFetchMyEventsQuery();
  const navigate = useNavigate();
  const user = useUser();

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user]);

  return (
    <div>
      <MyTitle text="xl">Your Events</MyTitle>
      <span className="h-[1px] my-4 w-full block bg-white opacity-70"></span>

      <div className="flex flex-col gap-4">
        {myEvents ? (
          myEvents.length > 0 ? (
            myEvents.map((event, id) => (
              <Event
                key={`${event.title}_${id}`}
                index={id}
                eventData={event}
                canEdit={true}
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
