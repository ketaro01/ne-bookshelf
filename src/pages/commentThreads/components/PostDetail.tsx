import React from 'react';

// JS
import moment from 'moment';
import styled from 'styled-components';

// COMPONENTS
import ArrowTopDown from '@/pages/commentThreads/components/ArrowTopDown';
import QuillEditor from '@/pages/commentThreads/components/QuillEditor';

interface IPostDetailProps {
  post: {
    title: string;
    nickName: string;
    content: string;
    created: string;
  };
}

const PostBox = styled.div`
  .post-box {
    display: flex;
    position: relative;
    width: 100%;
    > .content-box {
      padding: 0 10px 10px 30px;
      width: 100%;
      > .header-info {
        color: gray;
        font-size: 12px;
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
          <div className="header-info">
            Posted by {post.nickName} {moment(post.created).fromNow()}
          </div>
          <div>{post.content}</div>
        </div>
      </div>
      <div style={{ height: 200 }}>
        <QuillEditor changeValue={onChangeValue} />
      </div>
    </PostBox>
  );
};

export default PostDetail;
