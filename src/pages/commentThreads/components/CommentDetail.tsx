import React from 'react';

// JS
import moment from 'moment';
import styled from 'styled-components';

// COMPONENTS
import { Avatar, Comment, Tooltip } from 'antd';
import ArrowTopDown from '@/pages/commentThreads/components/ArrowTopDown';

interface ICommentProps {
  comment: {
    commentId: number;
    depth: number;
    nickName: string;
    image?: string | null;
    userId: string;
    comment: string;
    created: string;
  };
}
const ThreadLine = styled.div`
  height: 100%;
  width: 20px;
  position: relative;
  &::after {
    content: '';
    width: 2px;
    height: 100%;
    background-color: #ddd;
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
  }
`;

const CommentBox = styled.div`
  display: flex;
  .left-bar {
    position: relative;
  }
  .comment-box {
    padding: 10px;
  }
`;

const CommentDetail: React.FC<ICommentProps> = ({ comment }) => {
  const created = moment(comment.created);
  return (
    <CommentBox>
      {new Array(comment.depth).fill('').map((_, dIndex) => {
        const sameDepth = comment.depth === dIndex + 1;
        return (
          <div key={`arrow_${comment.commentId}_${dIndex}`} className="left-bar">
            {sameDepth && <ArrowTopDown />}
            <ThreadLine />
          </div>
        );
      })}
      <div className="comment-box">
        <Comment
          actions={[<span key="comment-basic-reply-to">Reply to</span>]}
          author={<a>{comment.nickName}</a>}
          avatar={<Avatar src={comment.image ? comment.image : undefined} alt={comment.nickName} />}
          content={<p>{comment.comment}</p>}
          datetime={
            <Tooltip title={created.format('YYYY-MM-DD HH:mm:ss')}>
              <span>{created.fromNow()}</span>
            </Tooltip>
          }
        />
      </div>
    </CommentBox>
  );
};

export default CommentDetail;
