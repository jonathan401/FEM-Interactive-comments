export type dataType = {
  currentUser: {
    image: {
      png: string;
      webp: string;
    };
    username: string;
  };
  comments: CommentType[];
};

export type UserType = {
  image: {
    png: string;
    webp: string;
  };
  username: string;
};

export type CommentType = {
  id: number;
  content: string;
  createdAt: string;
  score: number;
  likedBy?: string[];
  parentID?: number;
  user: {
    image: {
      png: string;
      webp: string;
    };
    username: string;
  };
  replies: ReplyType[];
};

export type ReplyType = {
  id: number;
  content: string;
  createdAt: string;
  score: number;
  likedBy?: string[];
  replyingTo: string;
  parentID?: number;
  user: {
    image: {
      png: string;
      webp: string;
    };
    username: string;
  };
};

export type ActionType = "add" | "reply" | "edit";

export type CurrentCommentType = CommentType | ReplyType | null;

export type UpdateType = {
  id: number;
  newContent: string;
};

export type CurrentUserType = {
  image: {
    png: string;
    webp: string;
  };
  username: string;
};
