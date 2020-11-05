import React, { useEffect, useState } from 'react';

// COMPONENTS
import { PageContainer } from '@ant-design/pro-layout';
import { Card, Divider } from 'antd';
import CommentDetail from '@/pages/commentThreads/components/CommentDetail';
import PostDetail from '@/pages/commentThreads/components/PostDetail';
import { getPost } from '@/pages/commentThreads/service';

interface IGuestBookProps {}

const defaultProps: IGuestBookProps = {};

const CommentThreads: React.FC<IGuestBookProps> = ({ match }) => {
  const post = {};
  const comments = [];

  const loadData = async () => {
    const { postId } = match.params;
    if (!postId) return;
    const res = await getPost(postId);
    console.log(res);
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

  const onClickSubmit = async (submitInfo: object, value: string) => {
    const res = await new Promise((resolve) => {
      setTimeout(() => {
        console.log(value);
        resolve(true);
      }, 1000);
    });

    return res;
  };

  return (
    <PageContainer>
      <Card>
        <PostDetail post={post} commentCnt={comments.length} submit={onClickSubmit} />
        <Divider />
        {comments.map((item: any) => (
          <CommentDetail
            key={item.commentId}
            commentInfo={item}
            changeIndex={handleChangeIndex}
            clickLine={handleClickLine}
            lineDepth={lineDepth}
            hideComments={hideComments}
            submit={onClickSubmit}
          />
        ))}
      </Card>
    </PageContainer>
  );
};

CommentThreads.defaultProps = defaultProps;

export default CommentThreads;
