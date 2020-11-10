import { Effect, Reducer } from 'umi';
import { CommentItemType, PostItemType } from '@/pages/commentThreads/data';
import {
  getPost,
  getCommentList,
  createComment,
  deleteComment,
  updateComment,
} from '@/pages/commentThreads/service';

export interface ThreadModelState {
  post?: PostItemType;
  commentList: CommentItemType[];
}

export interface ThreadModelType {
  namespace: 'thread';
  state: ThreadModelState;
  effects: {
    fetchGetPost: Effect;
    fetchGetCommentList: Effect;
    fetchCreateComment: Effect;
    fetchDeleteComment: Effect;
    fetchUpdateComment: Effect;
  };
  reducers: {
    updatePost: Reducer;
    updateCommentList: Reducer;
    updateComment: Reducer;
  };
}

const initialState: ThreadModelState = {
  commentList: [],
  post: undefined,
};

const ThreadModel: ThreadModelType = {
  namespace: 'thread',

  state: initialState,

  effects: {
    *fetchGetPost({ payload }, { call, put }) {
      const { response, error } = yield call(getPost, payload.postId);

      if (error) return;

      yield put({
        type: 'updatePost',
        payload: response,
      });
    },
    *fetchGetCommentList({ payload }, { call, put }): object | null {
      const { response, error } = yield call(getCommentList, payload.postId);

      if (error) return null;

      yield put({
        type: 'updateCommentList',
        payload: response,
      });

      return response;
    },

    *fetchCreateComment({ payload }, { call, put }): object | null {
      const { error } = yield call(createComment, payload);

      if (error) return null;

      return yield put({
        type: 'fetchGetCommentList',
        payload: { postId: payload.commentParentId },
      });
    },
    *fetchDeleteComment({ payload }, { call, put }) {
      const { response, error } = yield call(deleteComment, payload.commentId);

      if (error) return;

      yield put({
        type: 'updateComment',
        payload: response,
      });
    },
    *fetchUpdateComment({ payload }, { call, put }): object | null {
      const { response, error } = yield call(updateComment, payload);

      if (error) return null;

      return yield put({
        type: 'updateComment',
        payload: response,
      });
    },
  },

  reducers: {
    updatePost(state = initialState, action) {
      return {
        ...state,
        post: action.payload,
      };
    },
    updateCommentList(state = initialState, action) {
      return {
        ...state,
        commentList: action.payload,
      };
    },
    updateComment(state = initialState, action) {
      return {
        ...state,
        commentList: state.commentList.map((item: CommentItemType) =>
          item.commentId === action.payload.commentId ? action.payload : item,
        ),
      };
    },
  },
};

export default ThreadModel;
