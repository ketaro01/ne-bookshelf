import { Effect, Reducer } from 'umi';
import { CommentItemType, PostItemType } from '@/pages/commentThreads/data';
import {
  getPost,
  getCommentList,
  createComment,
  deleteComment,
} from '@/pages/commentThreads/service';

export interface ThreadModelState {
  post: PostItemType | {};
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
  };
}

const initialState: ThreadModelState = {
  commentList: [],
  post: {},
};

const ThreadModel: ThreadModelType = {
  namespace: 'thread',

  state: initialState,

  effects: {
    *fetchGetPost({ payload }, { call, put }) {
      const response = yield call(getPost, payload.postId);
      yield put({
        type: 'updatePost',
        payload: response,
      });
    },
    *fetchGetCommentList({ payload }, { call, put }) {
      const response = yield call(getCommentList, payload.postId);
      if (response.status !== 200) return;
      yield put({
        type: 'updateCommentList',
        payload: response,
      });
    },

    *fetchCreateComment({ payload }, { call, put }) {},
    *fetchDeleteComment({ payload }, { call, put }) {},
    *fetchUpdateComment({ payload }, { call, put }) {},
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
        commentList: state.commentList.map((item) =>
          item.commentId === action.payload.commentId ? action.payload : item,
        ),
      };
    },
  },
};

export default ThreadModel;
