import React from 'react';

// JS
import styled from 'styled-components';

// COMPONENTS
import ArrowTopDown from '@/pages/commentThreads/components/ArrowTopDown';
import QuillEditor from '@/pages/commentThreads/components/QuillEditor';
import CommentItem from '@/pages/commentThreads/components/CommentItem';

interface IPostDetailProps {
  post: {
    title: string;
    nickName: string;
    content: string;
    created: string;
  };
  commentCnt: number;
}

const PostBox = styled.div`
  .post-box {
    display: flex;
    position: relative;
    width: 100%;
    > .content-box {
      padding: 0 10px 10px 30px;
      width: 100%;
      .ant-comment-inner {
        padding-top: 0;
      }
    }
  }
`;

const PostDetail: React.FC<IPostDetailProps> = ({ post }) => {
  const onChangeValue = (value: string) => {
    console.log(value);
  };
  return (
    <PostBox>
      <h2>{post.title}</h2>
      <div className="post-box">
        <ArrowTopDown />
        <div className="content-box">
          <CommentItem
            actions={[<span key="comment-basic-reply-to">Reply</span>]}
            content={post.content}
            created={post.created}
          />
        </div>
      </div>
      <div style={{ height: 200 }}>
        <QuillEditor changeValue={onChangeValue} />
      </div>
    </PostBox>
  );
};

export default PostDetail;
