import { useCommentContext } from "../../contexts/CommentsContext";
import Comment from "../comment/Comment";

// styles
import styles from "./CommentList.module.css";

const CommentList = () => {
  const { comments } = useCommentContext();
  return (
    <ul className={styles.wrapper}>
      {comments.map((comment) => (
        <Comment
          key={comment.id}
          comment={{
            ...comment,
            replies: comment.replies ? [...comment.replies] : [],
          }}
        />
      ))}
    </ul>
  );
};

export default CommentList;
