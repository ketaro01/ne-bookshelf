// import { PostItemType, CommentItemType } from "@/pages/commentThreads/data";

import request from '@/utils/request';

export async function getPost(postId: string | number) {
  return request(`/api/thread/post/${postId}`);
}

export async function getCommentList(postId: string | number) {
  return request(`/api/thread/comments/${postId}`);
}

export async function deleteComment(commentId: string | number) {
  return request(`/api/thread/comments/${commentId}`, {
    methods: 'DELETE',
  });
}

export async function createComment(params) {
  return request(`/api/thread/comments`, {
    methods: 'POST',
    data: params,
  });
}
