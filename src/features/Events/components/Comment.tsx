import React, { FC, useEffect, useRef, useState } from "react";
import { Variants, motion } from "framer-motion";
import { IComment } from "@shared/types/IComment";
import { MdDelete, MdEdit } from "react-icons/md";
import { eventApi } from "@shared/api/eventApi";
import { BiSend } from "react-icons/bi";
import { toTopVariants } from "@shared/animationProps";

interface ICommentProps {
  comment: IComment;
  index: number;
  // toTopVariants: Variants;
  isFirst: boolean;
}

export const Comment: FC<ICommentProps> = ({ comment, index, isFirst }) => {
  const [deleteComment] = eventApi.useDeleteCommentMutation();
  const [editComment] = eventApi.useEditCommentMutation();
  const [isEditComm, setIsEditComm] = useState<boolean>(false);
  const [editedText, setEditedText] = useState<string>(comment.commentBody);

  const inputRef = useRef<HTMLInputElement>(null);

  const onDeleteComment = async (commentId: number | string) => {
    try {
      await deleteComment(commentId);
    } catch (error) {
      console.log(error);
    }
  };

  const onSaveComment = async () => {
    try {
      if (editedText) {
        const commentData = {
          commentId: comment._id,
          commentBody: editedText,
        };
        const res = await editComment(commentData).unwrap(); // отправляем данные
        setIsEditComm(false);
        console.log(res);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    if (isEditComm && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditComm]);

  const animationProps = {
    isFirst,
    index,
  };

  return (
    <motion.div
      variants={toTopVariants}
      initial="initial"
      animate="opened"
      exit="initial"
      custom={animationProps}
      className="flex flex-col bg-[#383838] shadow rounded-lg py-1 px-2"
    >
      <div className="flex justify-between w-full">
        <h1>{comment.creator.firstname}</h1>
        <div className="flex gap-1">
          <MdEdit
            size={20}
            onClick={() => setIsEditComm(!isEditComm)}
            cursor={"pointer"}
            className="hover:opacity-75 transition"
          />
          <MdDelete
            onClick={() => onDeleteComment(comment._id)}
            size={20}
            cursor={"pointer"}
            className="hover:opacity-75 transition"
          />
        </div>
      </div>

      {isEditComm ? (
        <div className="flex justify-between items-center">
          <input
            ref={inputRef} // связываем инпут с рефом
            type="text"
            className="bg-transparent border-b text-base w-[90%] mt-1"
            value={editedText}
            onChange={(e) => setEditedText(e.target.value)}
          />
          <BiSend
            onClick={onSaveComment}
            cursor={"pointer"}
            className="hover:opacity-75 transition"
          />
        </div>
      ) : (
        <p className="text-base overflow-hidden break-words mt-1 border-b border-transparent">
          {editedText}
        </p>
      )}
    </motion.div>
  );
};
