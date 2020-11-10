import React, { useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { connect, useDispatch } from 'umi';
import { ConnectState } from '@/models/connect';

// COMPONENTS
import { PageContainer } from '@ant-design/pro-layout';
import { Card, Divider } from 'antd';
import CommentDetail from '@/pages/commentThreads/components/CommentDetail';
import PostDetail from '@/pages/commentThreads/components/PostDetail';
import { ThreadModelState } from '@/models/thread';
import { CurrentUser } from '@/models/user';
import { CommentItemType } from '@/pages/commentThreads/data';

interface MatchParams {
  postId: string;
}

interface ICommentThreads extends RouteComponentProps<MatchParams>, Partial<ThreadModelState> {
  currentUser?: Partial<CurrentUser>;
}

const CommentThreads: React.FC<ICommentThreads> = ({ commentList, post, currentUser, match }) => {
  const dispatch = useDispatch();
  const loadData = async () => {
    const { postId } = match.params;
    if (!postId) return;
    await dispatch({ type: 'thread/fetchGetPost', payload: { postId } });
    await dispatch({ type: 'thread/fetchGetCommentList', payload: { postId } });
  };

  useEffect(() => {
    loadData();
  }, []);

  const [hideComments, setHideComments] = useState({});
  const [lineDepth, setLineDepth] = useState<{
    dIndex: number | null;
    nodePath: string | null;
  } | null>(null);

  const handleChangeIndex = (dIndex: number | null, nodePath: string | null) => {
    if (typeof dIndex !== 'number' || !nodePath) {
      setLineDepth(null);
      return;
    }
    setLineDepth({ dIndex, nodePath });
  };

  const handleClickLine = (nodePath: string | null) => {
    if (!nodePath) return;
    const nextHideComments = { ...hideComments };
    if (nextHideComments[nodePath]) {
      delete nextHideComments[nodePath];
      setHideComments(nextHideComments);
      return;
    }
    const resetItems = Object.keys(nextHideComments).filter((path) => path.indexOf(nodePath) > -1);
    let i = 0;
    for (i; i < resetItems.length; i += 1) {
      delete nextHideComments[resetItems[i]];
    }

    nextHideComments[nodePath] = true;
    setHideComments(nextHideComments);
  };

  const onClickSubmit = async (submitInfo: CommentItemType, value: string): Promise<boolean> => {
    if (!submitInfo) return false;

    try {
      const user = currentUser || {};
      const submitComment: CommentItemType = {
        content: value,
        commentParentId: submitInfo.postId || submitInfo.commentParentId,
        nickName: user.name!,
        userId: user.userid!,
        node_path: submitInfo.node_path,
        depth: submitInfo.depth,
      };

      const result = await dispatch({ type: 'thread/fetchCreateComment', payload: submitComment });

      return !!result;
    } catch (e) {
      console.log(e.message);
      return false;
    }
  };

  const onClickUpdate = async (submitInfo: CommentItemType, value: string): Promise<boolean> => {
    if (!submitInfo) return false;

    try {
      const submitComment: object = {
        commentId: submitInfo.commentId,
        content: value,
      };

      const result = await dispatch({ type: 'thread/fetchUpdateComment', payload: submitComment });

      return !!result;
    } catch (e) {
      console.log(e.message);
      return false;
    }
  };

  const onClickDelete = async (commentInfo: CommentItemType): Promise<void> => {
    const { commentId, commentParentId } = commentInfo;
    if (!commentId || !commentParentId) return;

    try {
      await dispatch({
        type: 'thread/fetchDeleteComment',
        payload: {
          commentId,
          commentParentId,
        },
      });
    } catch (e) {
      console.log(e.message);
    }
  };

  const renderCommentList = commentList || [];

  return (
    <PageContainer>
      <Card>
        <PostDetail post={post} commentCnt={renderCommentList.length} submit={onClickSubmit} />
        <Divider />
        {renderCommentList.map((item: any) => (
          <CommentDetail
            key={item.commentId}
            commentInfo={item}
            changeIndex={handleChangeIndex}
            clickLine={handleClickLine}
            lineDepth={lineDepth}
            hideComments={hideComments}
            submitComment={onClickSubmit}
            updateComment={onClickUpdate}
            deleteComment={onClickDelete}
          />
        ))}
      </Card>
    </PageContainer>
  );
};

export default connect(({ thread, user }: ConnectState) => ({
  commentList: thread.commentList,
  post: thread.post,
  currentUser: user.currentUser,
}))(CommentThreads);
