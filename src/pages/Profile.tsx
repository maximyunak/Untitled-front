import { Event } from "@features/Events";
import { Loader } from "@features/Loader/Loader";
import { MyTitle } from "@shared/UI/MyTitle";
import { eventApi } from "@shared/api/eventApi";

export const Profile = () => {
  const { data: myEvents } = eventApi.useFetchMyEventsQuery();
  console.log(myEvents);

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
