import React, { useEffect, useRef, useState } from 'react';
import { MyTitle } from '@shared/UI/MyTitle';
import { IEvent } from '@shared/types/IEvent';
import { MyFavorites } from '@shared/UI/MyFavorites';
import { BiComment, BiRepost } from 'react-icons/bi';
import { LiaKeySolid } from 'react-icons/lia';
import { FcLike } from 'react-icons/fc';
import { FullEvent } from './FullEvent';
import { useActiveBody } from '@shared/hooks/useActiveBody';
import { AnimatePresence, motion, useInView } from 'framer-motion';
import { toTop, toTopVariants, variantsStepPages } from '@shared/animationProps';

interface IEventProps {
  eventData: IEvent;
  index: number;
}

export const Event: React.FC<IEventProps> = ({ eventData, index }) => {
  const [isFull, setIsFull] = useState<boolean>(false);
  useActiveBody(isFull);

  const [isFirst, setIsFirst] = useState<boolean>(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsFirst(false);
    }, 200);
    return () => clearTimeout(timer);
  }, [eventData]);

  const animationProps = {
    isFirst,
    index,
  };

  const eventRef = useRef<HTMLDivElement>(null);

  const isInView = useInView(eventRef, { margin: '0px 0px 0px 0px' });

  return (
    <motion.div
      ref={eventRef}
      variants={toTopVariants}
      custom={animationProps}
      animate={isInView ? 'opened' : 'initial'}
      initial="initial"
    >
      <div
        className="bg-[#393939] p-4 max-sm:p-3 rounded-xl h-full relative"
        onClick={() => setIsFull(!isFull)}
      >
        {/* <h4>{eventData.creator.firstname}</h4> */}
        <div className="flex justify-between items-center">
          <div>
            <MyTitle text={'xl'}>{eventData.title}</MyTitle>
            <p className="text-xs font-light">3 hours ago</p>
          </div>
          <div className="alegreya italic">{eventData.country}</div>

          {/* <MyFavorites /> */}
        </div>
        <p className="mt-4 text-base max-w-[80%] break-words">{eventData.description}</p>

        <div className="mt-4 flex justify-between">
          <div className="alegreya flex gap-2 max-w-[150px]">
            {eventData.eventTypes.map((type, id) => (
              <span className="italic text-customPurple" key={`${type}_${id}`}>
                #{type}
              </span>
            ))}
          </div>
        </div>
        <div className="border-t absolute w-full left-0 mt-3 border-customPurple"></div>
        <div className="flex gap-4 mt-6 items-center">
          <FcLike className="-mt-1" />
          <BiComment />
          <BiRepost />
        </div>
      </div>
      <AnimatePresence>
        {isFull && <FullEvent eventData={eventData} onHide={() => setIsFull(!isFull)} />}
      </AnimatePresence>
    </motion.div>
  );
};
