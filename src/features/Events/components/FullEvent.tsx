import { MyInput } from '@shared/UI/MyInput';
import { MyTitle } from '@shared/UI/MyTitle';
import { IEvent } from '@shared/types/IEvent';
import React, { FC } from 'react';

import { motion } from 'framer-motion';
import { opacityVariant, showModalVariant } from '@shared/animationProps';

interface IFullEvent {
  eventData: IEvent;
  onHide: () => void;
}
const comments = [
  {
    firstname: 'Maxim',
    commentBody: 'sdfsdfsd sdfsdaf safsdafas',
  },
  {
    firstname: 'Emily',
    commentBody: 'This is a great article! I really enjoyed reading it.',
  },
  {
    firstname: 'John',
    commentBody: 'I agree with the author, this is a very insightful point.',
  },
  {
    firstname: 'Sarah',
    commentBody: 'I found this information to be very useful. Thanks for sharing!',
  },
  {
    firstname: 'David',
    commentBody: 'This is a well-written and informative article.',
  },
  {
    firstname: 'Jessica',
    commentBody:
      'I have to disagree with the author on this point, but I appreciate the perspective.',
  },
  {
    firstname: 'Michael',
    commentBody: 'I would love to hear more about this topic. Can you elaborate?',
  },
  {
    firstname: 'Ashley',
    commentBody: 'This article sparked some interesting thoughts for me.',
  },
  {
    firstname: 'Christopher',
    commentBody: 'I can definitely relate to this article. Great work!',
  },
  {
    firstname: 'Amanda',
    commentBody: 'This is a very well-researched article. I learned a lot.',
  },
];

export const FullEvent: FC<IFullEvent> = ({ eventData, onHide }) => {
  console.log(eventData);

  return (
    <motion.div
      variants={opacityVariant}
      initial="initial"
      animate="animate"
      exit="initial"
      className="fixed top-1/2 left-1/2 z-[999] transform-xy h-screen w-screen bg-[#282828] bg-opacity-50 flex justify-center items-center"
      onClick={onHide}
    >
      <div
        className="h-3/4 bg-[#303030] flex shadow-lg rounded-2xl p-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-[35vw] flex flex-col mt-5">
          {/* <MyTitle>Event Data</MyTitle> */}
          <MyTitle>{eventData.title}</MyTitle>
          <p className="text-xs font-light">3 hours ago</p>
          <p className="mt-4 text-base max-w-[80%] break-words overflow-auto mb-3">
            {eventData.description}
          </p>

          <div className="flex gap-2 flex-wrap justify-self-end mt-auto">
            {eventData.eventTypes.map((type, id) => (
              <span className="italic text-customPurple" key={`${type}_${id}`}>
                #{type}
              </span>
            ))}
          </div>
          <div className="alegreya italic">{eventData.country}</div>
        </div>
        <span className="h-full w-px block bg-white bg-opacity-30 ml-10 mr-4"></span>

        <div className="w-[20vw] overflow-auto text-lg">
          <MyTitle>Comments</MyTitle>
          <div className="max-w-[96%]">
            <MyInput placeholder="Leave your comment here" />
            <div className="flex flex-col gap-2 mt-3 ">
              {eventData.comments ? (
                eventData.comments.map((comment, id) => (
                  <div
                    className="flex flex-col bg-[#383838] shadow rounded-lg py-1 px-2"
                    // key={`${comment.firstname})${id}`}
                  >
                    {/* <h1>{comment.firstname}</h1> */}
                    <p className="text-sm">{comment.commentBody}</p>
                  </div>
                ))
              ) : (
                <p className="text-sm text-center mt-3">No comments yet</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
