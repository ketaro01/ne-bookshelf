import React from 'react';
import styled from 'styled-components';
import { PageContainer } from '@ant-design/pro-layout';
import Field from '@ant-design/pro-field';
import { Card } from 'antd';

interface GuestBookProps {}

const defaultProps: GuestBookProps = {};
let MockData = [
  {
    commentId: 1,
    commentParentId: null,
    comment: 'Thread Start!',
    node_path: '1',
    depth: 1,
  },
  {
    commentId: 3,
    commentParentId: 1,
    comment: 'Thread 1.3!!',
    node_path: '1.3',
    depth: 2,
  },
  {
    commentId: 4,
    commentParentId: 1,
    comment: 'Thread 1.4!!',
    node_path: '1.4',
    depth: 2,
  },
  {
    commentId: 5,
    commentParentId: 4,
    comment: 'Thread 4.5!!',
    node_path: '1.4.5',
    depth: 3,
  },
  {
    commentId: 2,
    commentParentId: null,
    comment: 'Thread Two Start!',
    node_path: '2',
    depth: 1,
  },
  {
    commentId: 6,
    commentParentId: 2,
    comment: 'Thread 2.6 Start!',
    node_path: '2.6',
    depth: 2,
  },
  {
    commentId: 8,
    commentParentId: 6,
    comment: 'Thread 2.6.8 Start!',
    node_path: '2.6.8',
    depth: 3,
  },
  {
    commentId: 9,
    commentParentId: 8,
    comment: 'Thread 2.6.8.9 Start!',
    node_path: '2.6.8.9',
    depth: 4,
  },
  {
    commentId: 10,
    commentParentId: 9,
    comment: 'Thread 2.6.8.9.10 Start!',
    node_path: '2.6.8.9.10',
    depth: 5,
  },
  {
    commentId: 7,
    commentParentId: 2,
    comment: 'Thread 2.7 Start!',
    node_path: '2.7',
    depth: 2,
  },
];
const randomName = [
  'Diane Jerosch',
  'Orlando Farney',
  'Marcos Skally',
  'Vincent',
  'Varndall',
  'Klimek',
  'Liam',
];
MockData = MockData.map((item) => {
  return {
    ...item,
    name: randomName[Math.floor(Math.random() * randomName.length)],
    image:
      'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
  };
});

const ThreadLine = styled.div`
  height: 100px;
  width: 20px;
  position: relative;
  &::after {
    content: '';
    width: 2px;
    height: 100%;
    background-color: #ccc;
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
  }
`;

const CommentThreads: React.FC<GuestBookProps> = () => {
  return (
    <PageContainer>
      <Card>
        {MockData.map((item: any) => {
          return (
            <div style={{ display: 'flex' }}>
              {new Array(item.depth).fill('').map((_, dIndex) => {
                const sameDepth = item.depth === dIndex + 1;
                return (
                  <div style={{ position: 'relative' }}>
                    {sameDepth && (
                      <div
                        style={{
                          position: 'absolute',
                          top: 0,
                          width: 20,
                          backgroundColor: 'white',
                          zIndex: 10,
                        }}
                      >
                        TP
                      </div>
                    )}
                    <ThreadLine />
                  </div>
                );
              })}
              <Field text={item.name} mode="read" />
              <Field text={item.comment} mode="read" />
              <Field text={item.image} mode="read" valueType="avatar" />
            </div>
          );
        })}
      </Card>
    </PageContainer>
  );
};

CommentThreads.defaultProps = defaultProps;

export default CommentThreads;
