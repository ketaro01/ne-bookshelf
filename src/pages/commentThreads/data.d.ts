export interface PostItemType {
  postId?: number;
  userId: string;
  nickName: string;
  title?: string;
  content?: string;
  image?: string;
  created?: string;
  like?: number;
  dislike?: number;
  isDeleted?: boolean;
}

export interface CommentItemType extends PostItemType {
  commentId?: number;
  commentParentId?: number | null;
  node_path?: string;
  depth?: number;
}
