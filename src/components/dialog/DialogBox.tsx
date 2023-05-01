import { createPortal } from "react-dom";
import { useDialogContext } from "../../contexts/DialogContext";
import styles from "./DialogContent.module.css";
import { useCommentContext } from "../../contexts/CommentsContext";
import { useEffect, useRef } from "react";

const DialogBox = () => {
  const { switchComment, deleteComment, currentComment } = useCommentContext();

  const { dialogOpen, setDialogOpen } = useDialogContext();

  const buttonRef = useRef(null);

  // automatically focus the cancel button when the component mounts
  // useEffect(() => {
  //   if (buttonRef.current) {
  //     buttonRef.current.focus();
  //   }
  // }, []);

  // handlers
  const handleOkClick = () => {
    if (currentComment) {
      deleteComment(currentComment.id);
    }
    setDialogOpen(false);
  };

  const handleCancelClick = () => {
    switchComment(null);
    setDialogOpen(false);
  };

  if (!dialogOpen) return null;

  return createPortal(
    <div className={styles.wrapper}>
      <div className={styles.dialog}>
        <h2 className={styles.title}>Delete comment</h2>
        <p>
          Are you sure you want to delete this comment? This will remove the
          comment and can&apos;t be undone.
        </p>
        <div className={styles.dialogControls}>
          <button
            ref={buttonRef}
            type="button"
            className="secondary contained"
            onClick={handleCancelClick}
          >
            No, cancel
          </button>
          <button type="button" className="danger" onClick={handleOkClick}>
            yes, delete
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default DialogBox;
