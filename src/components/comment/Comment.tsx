import React, { useEffect, useState } from "react";

import UpdateForm from "../commentForm/UpdateForm";

import ReplyIcon from "../../assets/images/icon-reply.svg";
import PlusIcon from "../../assets/images/icon-plus.svg";
import MinusIcon from "../../assets/images/icon-minus.svg";
import DeleteIcon from "../../assets/images/icon-delete.svg";
import EditIcon from "../../assets/images/icon-edit.svg";

// styles
import styles from "./Comment.module.css";
import { CommentType } from "../../types/index";
import CommentForm from "../commentForm/CommentForm";
import { useCommentContext } from "../../contexts/CommentsContext";
import { useDialogContext } from "../../contexts/DialogContext";

export interface CommentProps {
  comment: CommentType;
  replyingTo?: string;
}

const Comment: React.FC<CommentProps> = ({ comment, replyingTo }) => {
  const {
    userAuth,
    switchComment,
    currentComment,
    action,
    setAction,
    updateReply,
    vote,
  } = useCommentContext();
  const { setDialogOpen } = useDialogContext();

  const mention = replyingTo ? replyingTo : "";
  const isCurrentUser = userAuth === comment.user.username;
  const [isShow, setIsShow] = useState(false);

  const handleIncrement = () => {
    vote(comment.id, comment.score + 1);
  };

  const handleDecrement = () => {
    vote(comment.id, comment.score - 1);
  };

  const handleReplyClick = () => {
    // !isShow === true : false
    switchComment(!isShow ? comment : null);
    setAction(!isShow ? "reply" : "add");
    setIsShow(!isShow);
  };

  const handleEditCick = () => {
    switchComment(!isShow ? comment : null);
    setAction(!isShow ? "edit" : "add");
    setIsShow(!isShow);
  };

  const handleDeleteClick = () => {
    switchComment(comment);
    setDialogOpen(true);
  };

  const userControl = () =>
    isCurrentUser ? (
      <div className={styles.controlBtns}>
        <button
          type="button"
          className="danger ghost icon-btn"
          onClick={handleDeleteClick}
        >
          <img src={DeleteIcon} alt="" aria-hidden="true" />
          Delete
        </button>
        <button
          type="button"
          className="ghost icon-btn"
          onClick={handleEditCick}
        >
          <img src={EditIcon} alt="" aria-hidden="true" />
          Edit
        </button>
      </div>
    ) : (
      <div className={styles.controlBtns}>
        <button
          type="button"
          className="ghost icon-btn"
          onClick={handleReplyClick}
        >
          <img src={ReplyIcon} alt="" aria-hidden="true" />
          Reply
        </button>
      </div>
    );

  const votesControl = () => (
    <div className={styles.voteControlBtns}>
      <button
        type="button"
        aria-label="upvote comment"
        onClick={handleIncrement}
      >
        <img src={PlusIcon} alt="" aria-hidden="true" />
      </button>
      <p aria-live="polite">{comment.score}</p>
      <button
        type="button"
        aria-label="downvote comment"
        onClick={handleDecrement}
      >
        <img src={MinusIcon} alt="" aria-hidden="true" />
      </button>
    </div>
  );

  return (
    <li>
      <article className={styles.commentWrapper}>
        <div className="desktop">{votesControl()}</div>
        <div className={styles.body}>
          <div className={styles.commentHeader}>
            <div className={styles.meta}>
              <div className={styles.avatarWrapper}>
                <a href="#">
                  <img
                    className="avatar"
                    src={comment.user.image.webp}
                    alt={comment.user.username}
                  />
                </a>
              </div>
              <a href="#" className={styles.username}>
                {comment.user.username}
              </a>
              {isCurrentUser && <span className={styles.userBadge}>you</span>}
              <p className="timeline">{comment.createdAt}</p>
            </div>
            <div className="desktop">{userControl()}</div>
          </div>
          <div className={styles.content}>
            {/* render update form here */}
            {action === "edit" && comment.id === currentComment?.id ? (
              <UpdateForm
                initialValue={comment.content}
                updateReply={updateReply}
                currentComment={currentComment}
                setAction={setAction}
                setIsShow={setIsShow}
              />
            ) : (
              <p>
                {mention && (
                  <a href="#" className={styles.mention}>
                    @{replyingTo}
                  </a>
                )}{" "}
                {comment.content}
              </p>
            )}
          </div>
          <div className="mobile">
            <div className={styles.commentFooter}>
              {votesControl()}
              {userControl()}
            </div>
          </div>
        </div>
      </article>
      {/* show comment form */}
      {isShow && !isCurrentUser && (
        <CommentForm
          setIsShow={setIsShow}
          placeholder={`@${comment.user.username}`}
        />
      )}
      {/* recursively render the comment component if the comment has any reply */}
      {comment.replies && comment.replies?.length > 0 && (
        <ul className={styles.nestedComments}>
          {comment.replies.map((reply) => (
            <Comment
              comment={{ ...reply, replies: [], parentID: comment.id }}
              replyingTo={reply.replyingTo}
              key={reply.id}
            />
          ))}
        </ul>
      )}
    </li>
  );
};

export default Comment;
