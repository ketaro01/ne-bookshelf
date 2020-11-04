import React, { useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Card, Divider } from 'antd';
import CommentDetail from '@/pages/commentThreads/components/CommentDetail';
import PostDetail from '@/pages/commentThreads/components/PostDetail';

interface IGuestBookProps {}

const defaultProps: IGuestBookProps = {};
const MockData = {
  post: {
    userId: 'liamyoon',
    nickName: 'liamyoon',
    title: 'kt nexr thread post',
    content: 'kt nexr thread content',
    created: '2020-11-01T21:21:41.052Z',
  },
  comments: [
    {
      commentId: 1,
      commentParentId: null,
      comment: 'Thread Start!',
      node_path: '1',
      depth: 1,
      created: '2020-11-02T21:21:41.052Z',
    },
    {
      commentId: 3,
      commentParentId: 1,
      comment: 'Thread 1.3!!',
      node_path: '1.3',
      depth: 2,
      created: '2020-11-02T21:21:41.052Z',
    },
    {
      commentId: 4,
      commentParentId: 1,
      comment: 'Thread 1.4!!',
      node_path: '1.4',
      depth: 2,
      created: '2020-11-02T21:21:41.052Z',
    },
    {
      commentId: 5,
      commentParentId: 4,
      comment: 'Thread 4.5!!',
      node_path: '1.4.5',
      depth: 3,
      created: '2020-11-02T21:21:41.052Z',
    },
    {
      commentId: 2,
      commentParentId: null,
      comment: 'Thread Two Start!',
      node_path: '2',
      depth: 1,
      created: '2020-11-02T21:21:41.052Z',
    },
    {
      commentId: 6,
      commentParentId: 2,
      comment: 'Thread 2.6 Start!',
      node_path: '2.6',
      depth: 2,
      created: '2020-11-02T21:21:41.052Z',
    },
    {
      commentId: 8,
      commentParentId: 6,
      comment: 'Thread 2.6.8 Start!',
      node_path: '2.6.8',
      depth: 3,
      created: '2020-11-02T21:21:41.052Z',
    },
    {
      commentId: 9,
      commentParentId: 8,
      comment: 'Thread 2.6.8.9 Start!',
      node_path: '2.6.8.9',
      depth: 4,
      created: '2020-11-02T21:21:41.052Z',
    },
    {
      commentId: 10,
      commentParentId: 9,
      comment: 'Thread 2.6.8.9.10 Start!',
      node_path: '2.6.8.9.10',
      depth: 5,
      created: '2020-11-02T21:21:41.052Z',
    },
    {
      commentId: 7,
      commentParentId: 2,
      comment: 'Thread 2.7 Start!',
      node_path: '2.7',
      depth: 2,
      created: '2020-11-02T21:21:41.052Z',
    },
  ],
};
const randomName = [
  'Diane Jerosch',
  'Orlando Farney',
  'Marcos Skally',
  'Vincent',
  'Varndall',
  'Klimek',
  'Liam',
];
const randomUserId = [
  'a1234',
  'auTestas',
  'acascas2',
  'cnclksanl',
  'rhdgurwns',
  'yapyap30',
  'limaaa',
];
MockData.comments = MockData.comments.map((item) => {
  return {
    ...item,
    nickName: randomName[Math.floor(Math.random() * randomName.length)],
    userId: randomUserId[Math.floor(Math.random() * randomUserId.length)],
    image:
      'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
  };
});

const CommentThreads: React.FC<IGuestBookProps> = () => {
  const { post, comments } = MockData;
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

  return (
    <PageContainer>
      <Card>
        <PostDetail post={post} commentCnt={comments.length} />
        <Divider />
        {comments.map((item: any) => (
          <CommentDetail
            key={item.commentId}
            commentInfo={item}
            changeIndex={handleChangeIndex}
            clickLine={handleClickLine}
            lineDepth={lineDepth}
            hideComments={hideComments}
          />
        ))}
      </Card>
    </PageContainer>
  );
};

CommentThreads.defaultProps = defaultProps;

export default CommentThreads;
