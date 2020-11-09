import React from 'react';

// JS
import styled from 'styled-components';
import { CommentItemType, PostItemType } from '@/pages/commentThreads/data';

// COMPONENTS
import ArrowTopDown from '@/pages/commentThreads/components/ArrowTopDown';
import QuillEditor from '@/pages/commentThreads/components/QuillEditor';
import CommentItem from '@/pages/commentThreads/components/CommentItem';

interface IPostDetailProps {
  post?: PostItemType;
  commentCnt: number;
  submit: (submitInfo: CommentItemType, value: string) => Promise<any>;
}

const PostBox = styled.div`
  .post-box {
    display: flex;
    position: relative;
    width: 100%;
    min-height: 100px;
    > .content-box {
      padding: 0 10px 10px 30px;
      width: 100%;
      .ant-comment-inner {
        padding-top: 0;
      }
    }
  }
`;

const PostDetail: React.FC<IPostDetailProps> = ({ post, submit }) => {
  return (
    <PostBox>
      {post && (
        <>
          <h2>{post.title}</h2>
          <div className="post-box">
            <ArrowTopDown like={post.like!} dislike={post.dislike!} />
            <div className="content-box">
              <CommentItem actions={[]} content={post.content} created={post.created} />
            </div>
          </div>
          <div style={{ height: 200 }}>
            <QuillEditor submit={submit} submitInfo={post} />
          </div>
        </>
      )}
    </PostBox>
  );
};

export default PostDetail;
