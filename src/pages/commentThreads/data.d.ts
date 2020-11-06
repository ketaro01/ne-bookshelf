export interface PostItemType {
  userId: string;
  nickName: string;
  title?: string;
  content?: string;
  image?: string;
  created: string;
  like: number;
  dislike: number;
}

export interface CommentItemType extends PostItemType {
  commentId?: number;
  commentParentId?: number | null;
  node_path: string;
  depth: number;
}
