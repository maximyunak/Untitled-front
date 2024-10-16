import { MyInput } from '@shared/UI/MyInput';
import { MyTitle } from '@shared/UI/MyTitle';
import { IEvent } from '@shared/types/IEvent';
import React, { ChangeEvent, FC, useCallback, useState } from 'react';

import { motion } from 'framer-motion';
import { opacityVariant, showModalVariant } from '@shared/animationProps';
import { eventApi } from '@shared/api/eventApi';
import { authApi } from '@shared/api/authApi';
import { skipToken } from '@reduxjs/toolkit/query';

interface IFullEvent {
  eventData: IEvent;
  onHide: () => void;
}

export const FullEvent: FC<IFullEvent> = React.memo(({ eventData, onHide }) => {
  const [createComment] = eventApi.useCreateCommentMutation();
  const token = localStorage.getItem('token');

  const { data: user } = authApi.useFetchUserQuery(token ? undefined : skipToken);
  const { data: commentsData } = eventApi.useFetchCommentQuery(eventData._id);

  const [comment, setComment] = useState<string>('');

  console.log(commentsData);

  const onCreateComment = useCallback(async () => {
    try {
      const commentData = {
        eventId: eventData._id,
        commentBody: comment,
        email: user?.email,
      };
      if (commentData.email && commentData.commentBody.length > 2) {
        await createComment(commentData);
        setComment('');
      }
    } catch (error) {
      console.log(error);
    }
  }, [comment, createComment, eventData._id, user?.email]);

  const onChangeComment = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setComment(e.target.value);
  }, []);

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
            <div className="flex gap-2">
              <MyInput
                value={comment}
                onChange={onChangeComment}
                placeholder="Leave your comment here"
              />
              <button onClick={onCreateComment}>send</button>
            </div>
            <div className="flex flex-col gap-2 mt-3 ">
              {commentsData && commentsData.length > 0 ? (
                commentsData.map((comment, id) => (
                  <div
                    className="flex flex-col bg-[#383838] shadow rounded-lg py-1 px-2"
                    key={`${comment.creator.firstname})${id}`}
                  >
                    <h1>{comment.creator.firstname}</h1>
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
});
