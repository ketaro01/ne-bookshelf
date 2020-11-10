// import { PostItemType, CommentItemType } from "@/pages/commentThreads/data";

import request from '@/utils/request';
import { CommentItemType } from '@/pages/commentThreads/data';

const requestWrap = (req: Promise<object>) => {
  return req.then((response) => ({ response })).catch(({ response }) => ({ error: response }));
};

export async function getPost(postId: string | number) {
  return requestWrap(request(`/api/thread/post/${postId}`));
}

export async function getCommentList(postId: string | number) {
  return requestWrap(request(`/api/thread/comments/${postId}`));
}

export async function createComment(params: object | null) {
  return requestWrap(
    request('/api/thread/comments', {
      method: 'POST',
      data: params,
    }),
  );
}

export async function deleteComment(commentId: string | number) {
  return requestWrap(
    request(`/api/thread/comments/${commentId}`, {
      method: 'DELETE',
    }),
  );
}

export async function updateComment(params: CommentItemType) {
  return requestWrap(
    request(`/api/thread/comments/${params.commentId}`, {
      method: 'PUT',
      data: params,
    }),
  );
}
