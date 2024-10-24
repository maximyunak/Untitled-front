import { MyInput } from "@shared/UI/MyInput";
import { MyTitle } from "@shared/UI/MyTitle";
import { IEvent } from "@shared/types/IEvent";
import React, {
  ChangeEvent,
  FC,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import { AnimatePresence, Variant, Variants, motion } from "framer-motion";
import { opacityVariant } from "@shared/animationProps";
import { eventApi } from "@shared/api/eventApi";
import { authApi } from "@shared/api/authApi";
import { skipToken } from "@reduxjs/toolkit/query";
import { BiSend } from "react-icons/bi";
import { MdDelete, MdEdit } from "react-icons/md";
import { Comment } from "./Comment";

interface IFullEvent {
  eventData: IEvent;
  onHide: () => void;
  isComment: boolean;
  setIsComment: (b: boolean) => void;
  canEdit?: boolean;
}

export const FullEvent: FC<IFullEvent> = React.memo(
  ({ eventData, onHide, isComment, setIsComment, canEdit }) => {
    const [createComment] = eventApi.useCreateCommentMutation();
    const [deleteEvent] = eventApi.useDeleteEventMutation();
    const { data: commentsData } = eventApi.useFetchCommentQuery(eventData._id);

    const token = localStorage.getItem("token");
    const { data: user } = authApi.useFetchUserQuery(
      token ? undefined : skipToken
    );

    const [comment, setComment] = useState<string>("");

    const onCreateComment = useCallback(async () => {
      try {
        const commentData = {
          eventId: eventData._id,
          commentBody: comment,
          email: user?.email,
        };
        if (commentData.email && commentData.commentBody.length > 2) {
          await createComment(commentData);
          setComment("");
        }
      } catch (error) {
        console.log(error);
      }
    }, [comment, createComment, eventData._id, user?.email]);

    const onChangeComment = useCallback((e: ChangeEvent<HTMLInputElement>) => {
      setComment(e.target.value);
    }, []);

    const [isFirst, setIsFirst] = useState<boolean>(true);

    useEffect(() => {
      const timer = setTimeout(() => {
        setIsFirst(false);
      }, 200);
      return () => clearTimeout(timer);
    }, [comment]);

    useEffect(() => {
      setIsComment(false);
    }, []);

    const handleDeleteEvent = () => {
      try {
      } catch (error) {
        console.log(error);
      }
    };

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
          className="h-4/6 bg-[#303030] flex shadow-lg rounded-2xl p-4 max-lg:flex-col max-lg:w-4/6 max-md:w-10/12"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="w-[35vw] flex flex-col mt-5">
            <div className="flex justify-between">
              <div>
                <MyTitle>{eventData.title}</MyTitle>
                <p className="text-xs font-light">3 hours ago</p>
              </div>
              <div>{canEdit && <MdDelete />}</div>
            </div>
            <p className="mt-4 text-base max-w-[80%] break-words overflow-auto mb-3">
              {eventData.description}
            </p>

            <div className="flex gap-2 flex-wrap justify-self-end mt-auto">
              {eventData.eventTypes.map((type, id) => (
                <span
                  className="italic text-customPurple"
                  key={`${type}_${id}`}
                >
                  #{type}
                </span>
              ))}
            </div>
            <div className="alegreya italic">{eventData.country}</div>
          </div>
          <span className="h-full w-px block bg-white bg-opacity-30 lg:ml-10 lg:mr-4 max-lg:h-px max-lg:w-full max-lg:my-4 max-lg:mt-auto "></span>

          <div className="w-[20vw] overflow-auto text-lg max-xl:w-[25vw] max-lg:w-full max-lg:mt-auto">
            <MyTitle>Comments</MyTitle>
            <div className="lg:max-w-[96%]">
              <div className="flex gap-2">
                <MyInput
                  isFocus={isComment}
                  value={comment}
                  onChange={onChangeComment}
                  placeholder="Leave your comment here"
                />
                <button
                  onClick={onCreateComment}
                  className="bg-[#383838] w-10 flex justify-center items-center rounded-lg hover:opacity-80 transition"
                >
                  <BiSend />
                </button>
              </div>
              <div className="flex flex-col gap-2 mt-3 ">
                <AnimatePresence>
                  {commentsData && commentsData.length > 0 ? (
                    commentsData.map((comment, id) => (
                      <Comment
                        comment={comment}
                        index={id}
                        key={`${comment.creator.firstname})${id}`}
                        isFirst={isFirst}
                      />
                    ))
                  ) : (
                    <p className="text-sm text-center mt-3">No comments yet</p>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }
);
