import React, { useState } from "react";
import { formatDistance } from "date-fns";

// styles
import styles from "./CommentForm.module.css";
import { CommentType, ReplyType } from "../../types";
import { useCommentContext } from "../../contexts/CommentsContext";

export const dateFormat = formatDistance(new Date(), Date.now(), {
  addSuffix: true,
});

export const formatDate =
  dateFormat === "less than a minute ago" ? "just now" : dateFormat;

interface CommentFormProps {
  setIsShow?: React.Dispatch<React.SetStateAction<boolean>>;
  placeholder?: string;
}

const CommentForm: React.FC<CommentFormProps> = ({
  setIsShow,
  placeholder,
}) => {
  const {
    currentComment,
    currentUser,
    addComment,
    addReply,
    action,

    setAction,
  } = useCommentContext();
  const [value, setValue] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // create a template
    const newCommentTemp: CommentType = {
      id: Math.random() * 3,
      content: value,
      createdAt: dateFormat,
      score: 0,
      likedBy: [],
      user: currentUser,
      replies: [],
    };

    const replyTemp: ReplyType = {
      id: Math.random() * 3,
      content: value,
      createdAt: dateFormat,
      score: 0,
      likedBy: [],
      parentID: currentComment?.parentID,
      replyingTo: currentComment?.user.username || "",
      user: currentUser,
    };

    // call function to add the comment
    if (value) {
      action === "add" ? addComment(newCommentTemp) : addReply(replyTemp);
    }
    setValue("");
    if (setIsShow) {
      setIsShow(false);
      setAction("add");
    }
  };

  return (
    <form className={styles.wrapper} onSubmit={handleSubmit}>
      <a href="#">
        <img
          src={currentUser.image.webp}
          alt={currentUser.username}
          className="avatar desktop"
        />
      </a>
      <textarea
        aria-label="Comment"
        rows={3}
        required
        placeholder={placeholder ? placeholder : "Add a comment"}
        id="comment"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className={styles.textarea}
      />
      <div className="mobile">
        <div className={styles.cta}>
          <a href="#">
            <img
              src={currentUser.image.webp}
              alt={currentUser.username}
              className="avatar"
            />
          </a>
          <button type="submit">Send</button>
        </div>
      </div>
      <button type="submit" className="desktop">
        {action === "add" ? "Send" : "Reply"}
      </button>
    </form>
  );
};

export default CommentForm;
