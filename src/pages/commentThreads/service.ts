// import { PostItemType, CommentItemType } from "@/pages/commentThreads/data";

import request from '@/utils/request';

export async function getPost(postId: string | number) {
  return request(`/api/thread/post/${postId}`);
}
