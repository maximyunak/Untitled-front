import { eventApi } from '@shared/api/eventApi';
import { Link } from 'react-router-dom';
import { CreateEvent, Event, EventList, FilterEvent } from '@features/Events';
import { Loader } from '@features/Loader/Loader';
import { MyTitle } from '@shared/UI/MyTitle';
import { FiFilter } from 'react-icons/fi';
import { useRef, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useActiveBody } from '@shared/hooks/useActiveBody';

export const Home = () => {
  // const token = localStorage.getItem("token");
  // const { data: user, isLoading } = authApi.useFetchUserQuery();
  const { data: eventData } = eventApi.useFetchEventsQuery();

  console.log(eventData);

  const containerRef = useRef<HTMLDivElement>(null);

  const [isCreate, setIsCreate] = useState<boolean>(false);

  useActiveBody(isCreate);

  return (
    <div className="">
      <h1
        className="bottom-10 right-10 fixed rounded-full bg-customPurple w-10 h-10 flex items-center justify-center text-2xl opacity-90 hover:opacity-100 transition cursor-pointer font-medium"
        onClick={() => setIsCreate(!isCreate)}
        ref={containerRef}
      >
        +
      </h1>

      <AnimatePresence>
        {isCreate && (
          <CreateEvent closeModal={() => setIsCreate(false)} containerRef={containerRef} />
        )}
      </AnimatePresence>

      <div>
        <div className="flex justify-between">
          <MyTitle text="xl">Top Picks Near You</MyTitle>
          <FiFilter />
        </div>
        <span className="h-[1px] my-4 w-full block bg-white opacity-70"></span>
        <FilterEvent />
        <span className="h-[1px] mt-4 mb-8 w-full block bg-white opacity-70"></span>

        <div className="flex flex-col gap-4">
          {eventData ? (
            eventData.events.map((event, id) => (
              <Event key={`${event.title}-_${id}`} eventData={event} />
            ))
          ) : (
            <Loader />
          )}
        </div>
      </div>

      <div className="z-[100]"></div>
    </div>
  );
};
