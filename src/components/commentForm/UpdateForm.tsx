// styles
import { useState } from "react";
import { ActionType, CurrentCommentType, UpdateType } from "../../types";
import styles from "./CommentForm.module.css";

type UpdateFormType = {
  initialValue: string;
  updateReply: (id: number, newContent: string) => void;
  currentComment: CurrentCommentType;
  setAction: React.Dispatch<React.SetStateAction<ActionType>>;
  setIsShow?: React.Dispatch<React.SetStateAction<boolean>>;
};

const UpdateForm: React.FC<UpdateFormType> = ({
  initialValue,
  updateReply,
  currentComment,
  setIsShow,
  setAction,
}) => {
  const [value, setValue] = useState(initialValue);
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    updateReply(currentComment?.id || 0, value);

    setValue("");
    if (setIsShow) {
      setIsShow(false);
      setAction("add");
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.formWrapper}>
      <textarea
        aria-label="Comment"
        rows={3}
        required
        id="comment"
        className={styles.textarea}
        onChange={(e) => setValue(e.target.value)}
        value={value}
      />
      <button type="submit">Update</button>
    </form>
  );
};

export default UpdateForm;
