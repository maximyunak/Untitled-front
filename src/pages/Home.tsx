import { eventApi } from "@shared/api/eventApi";
import { Link } from "react-router-dom";
import { CreateEvent, Event, EventList, FilterEvent } from "@features/Events";
import { Loader } from "@features/Loader/Loader";
import { MyTitle } from "@shared/UI/MyTitle";
import { FiFilter } from "react-icons/fi";
import React, { useRef, useState } from "react";
import { AnimatePresence, useInView } from "framer-motion";
import { useActiveBody } from "@shared/hooks/useActiveBody";
import { useAppSelector } from "@hooks";

export const Home = React.memo(() => {
  // const token = localStorage.getItem("token");
  // const { data: user, isLoading } = authApi.useFetchUserQuery();
  const { selectedCategories, selectedCountries, titleFilter } = useAppSelector(
    (state) => state.eventSlice
  );

  const eventsRef = useRef<HTMLDivElement>(null);

  const [page, setPage] = useState<number>(1);

  const { data: eventData } = eventApi.useFetchEventsQuery({
    selectedCategories,
    selectedCountries,
    titleFilter,
  });

  const { data: savedEvents } = eventApi.useGetSavedEventQuery();

  console.log(savedEvents);

  const [visibleFilter, setVisibleFilter] = useState<boolean>(false);

  // console.log(eventData);

  const containerRef = useRef<HTMLDivElement>(null);

  const [isCreate, setIsCreate] = useState<boolean>(false);

  useActiveBody(isCreate);

  console.log(eventData);

  return (
    <div className="w-full">
      <h1
        className="bottom-10 right-10 fixed rounded-full bg-customPurple w-10 h-10 flex items-center justify-center text-2xl opacity-90 hover:opacity-100 transition cursor-pointer font-medium z-50 max-md:right-5"
        onClick={() => setIsCreate(!isCreate)}
        ref={containerRef}
      >
        +
      </h1>

      <AnimatePresence>
        {isCreate && (
          <CreateEvent
            closeModal={() => setIsCreate(false)}
            containerRef={containerRef}
          />
        )}
      </AnimatePresence>

      <div className="w-full max-md:mt-4">
        <div className="flex justify-between">
          <MyTitle text="xl">Top Picks Near You</MyTitle>
          <FiFilter
            className="cursor-pointer"
            onClick={() => setVisibleFilter(!visibleFilter)}
          />
        </div>
        <span className="h-[1px] my-4 w-full block bg-white opacity-70"></span>
        <AnimatePresence>{visibleFilter && <FilterEvent />}</AnimatePresence>
        <div className="flex flex-col gap-4" ref={eventsRef}>
          {eventData ? (
            eventData.events.length > 0 ? (
              eventData.events.map((event, id) => (
                <Event
                  key={`${event.title}-_${id}`}
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

      <div className="z-[100]"></div>
    </div>
  );
});
