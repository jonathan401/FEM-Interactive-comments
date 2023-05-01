import React, { createContext, useContext, useEffect, useState } from "react";

import data from "../utils/data.json";
import mockData from "../utils/mockData";

import {
  CommentType,
  CurrentCommentType,
  ReplyType,
  ActionType,
} from "../types";
import { dateFormat } from "../components/commentForm/CommentForm";

export interface CommentsContextType {
  comments: CommentType[];
  userAuth: string;
  switchComment: (comment: CurrentCommentType) => void;
  addComment: (comment: CommentType) => void;
  currentComment: CurrentCommentType;
  currentUser: {
    image: {
      png: string;
      webp: string;
    };
    username: string;
  };
  vote: (id: number, newScore: number) => void;
  addReply: (reply: ReplyType) => void;
  setCurrentComment: (arg: CurrentCommentType) => void;
  deleteComment: (id: number) => void;
  action: ActionType;
  setAction: React.Dispatch<React.SetStateAction<ActionType>>;
  updateReply: (id: number, newContent: string) => void;
}

const CommentsContext = createContext<CommentsContextType | null>(null);

const storedComments = localStorage.getItem("comments");
let parsedComments: CommentType[] | (() => CommentType[]);

if (storedComments !== null) parsedComments = JSON.parse(storedComments);

export const CommentsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [comments, setComments] = useState<CommentType[]>(
    storedComments ? parsedComments : mockData.comments
  );
  const [currentComment, setCurrentComment] =
    useState<CurrentCommentType>(null);
  const [action, setAction] = useState<ActionType>("add");
  const currentUser = data.currentUser;
  const userAuth = currentUser.username;

  useEffect(() => {
    localStorage.setItem("comments", JSON.stringify(comments));
  }, [comments]);

  // functions
  const addComment = (comment: CommentType) => {
    setComments((prevComments) => [...prevComments, comment]);
  };

  const vote = (id: number, newScore: number) => {
    setComments((prevComments) => [
      ...prevComments.map((comment) => {
        if (comment.id === id) {
          return {
            ...comment,
            score: newScore,
          };
        }

        if (comment.replies.length) {
          return {
            ...comment,
            replies: [
              ...comment.replies.map((reply) => {
                if (reply.id === id) {
                  return {
                    ...reply,
                    score: newScore,
                  };
                }
                return reply;
              }),
            ],
          };
        }
        return comment;
      }),
    ]);
  };

  const addReply = (reply: ReplyType) => {
    // use the id or parent id of the reply to add the comment
    let position = reply.parentID ? reply.parentID : currentComment?.id;

    // console.log(newComments);
    setComments((prevComments) => [
      ...prevComments.map((comment) => {
        if (comment.id === position) {
          return { ...comment, replies: [...comment.replies, reply] };
        }
        return comment;
      }),
    ]);
  };

  const updateReply = (id: number, newContent: string) => {
    setComments((prevComments) => [
      ...prevComments.map((comment) => {
        if (comment.id === id) {
          return { ...comment, content: newContent, createdAt: dateFormat };
        }

        if (comment.replies.length) {
          return {
            ...comment,
            replies: [
              ...comment.replies.map((reply) => {
                if (reply.id === id) {
                  return {
                    ...reply,
                    content: newContent,
                    createdAt: dateFormat,
                  };
                }
                return reply;
              }),
            ],
          };
        }
        return comment;
      }),
    ]);
  };

  const deleteComment = (id: number) => {
    setComments((prevComments) => [
      ...prevComments.filter((comment) => {
        if (comment.id !== id) {
          if (comment.replies.length) {
            // FIXME: immutability change
            let newReplies = comment.replies.filter((reply) => {
              if (reply.id !== id) {
                return reply;
              }
            });
            return (comment.replies = newReplies);
          }
          return comment;
        }
      }),
    ]);
  };

  const switchComment = (comment: CurrentCommentType) => {
    setCurrentComment(comment);
  };

  const contextValues = {
    comments,
    userAuth,
    switchComment,
    currentComment,
    setCurrentComment,
    addComment,
    addReply,
    updateReply,
    deleteComment,
    currentUser,
    action,
    setAction,
    vote,
  };

  return (
    <CommentsContext.Provider value={contextValues}>
      {children}
    </CommentsContext.Provider>
  );
};

export const useCommentContext = () => {
  const context = useContext(CommentsContext);
  if (!context) {
    throw new Error("useCommentContext must be within a CommentsProvider");
  }
  return context;
};

export default CommentsContext;
