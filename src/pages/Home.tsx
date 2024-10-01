import { eventApi } from '@shared/api/eventApi';
import { Link } from 'react-router-dom';
// import { StrokeToFillOnce } from "../features/Loader/StrokeToFillOnce";
import { CreateEvent, Event, EventList } from '@features/Events';
import { Loader } from '@features/Loader/Loader';
import { MyTitle } from '@shared/UI/MyTitle';

export const Home = () => {
  // const token = localStorage.getItem("token");
  // const { data: user, isLoading } = authApi.useFetchUserQuery();
  const { data: eventData } = eventApi.useFetchEventsQuery();

  return (
    <div className="">
      {/* <BrowseCategory /> */}
      {/* <CreateEvent /> */}

      {/* <MyButton>sdd</MyButton> */}

      <MyTitle text="xl">Top Picks Near You</MyTitle>
      <div className="w-full flex flex-wrap gap-4 mt-4">
        {eventData ? (
          eventData.events.map((event) => <Event key={event.title} eventData={event} />)
        ) : (
          <Loader />
        )}
      </div>
      {/* <div className="w-full flex flex-col gap-2">
        {eventData &&
          eventData.events.map((event, id) => (
            <EventList key={`${event}__${id}`} title={event.title} />
          ))}
      </div> */}
      <Link to="/registration">{/* <Loader /> */}</Link>
    </div>
  );
};
