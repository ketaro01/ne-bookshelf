import React, { useState } from 'react';

// JS
import styled, { css } from 'styled-components';
import moment from 'moment';
import { CommentItemType } from '@/pages/commentThreads/data';

// COMPONENTS
import ArrowTopDown from '@/pages/commentThreads/components/ArrowTopDown';
import CommentItem from '@/pages/commentThreads/components/CommentItem';
import { PlusCircleFilled } from '@ant-design/icons';
import QuillEditor from '@/pages/commentThreads/components/QuillEditor';

interface ICommentProps {
  commentInfo: CommentItemType;
  changeIndex: (dIndex: number | null, nodePath: string | null) => void;
  clickLine: (nodePath: string | null) => void;
  lineDepth?: {
    dIndex: number | null;
    nodePath: string | null;
  } | null;
  hideComments: object;
  submit: (submitInfo: object, value: string) => Promise<any>;
}
const ThreadLine = styled.div<{ highlight: boolean }>`
  height: 100%;
  width: 26px;
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
    transition: background-color 0.25s, width 0.25s;
    cursor: pointer;
    ${(props) =>
      props.highlight &&
      css`
        background-color: black;
        width: 4px;
      `}
  }
`;

const CommentBox = styled.div`
  > div {
    display: flex;
    min-height: 48px;
    .show-btn-box {
      display: flex;
      align-items: center;
      font-size: 12px;
      color: #ccc;
      > div {
        padding-left: 10px;
      }
      .show-btn {
        cursor: pointer;
        color: gray;
        transition: color 0.25s;
        &:hover {
          color: #333;
        }
      }
    }
  }
  .left-bar {
    position: relative;
  }
  .comment-box {
    padding: 10px;
    width: 100%;
  }
`;

const ReplySpan = styled.span<{ active: boolean }>`
  padding: 4px;
  border-radius: 8px;
  transition: all 0.25s !important;
  ${(props) =>
    props.active &&
    css`
      background-color: #ccc;
    `}
`;

const CommentAniBox = styled.div`
  height: 200px;
`;

const CommentDetail: React.FC<ICommentProps> = ({
  commentInfo,
  changeIndex,
  lineDepth,
  hideComments,
  clickLine,
  submit,
}) => {
  const [reply, setReply] = useState(false);
  const {
    content,
    commentId,
    node_path,
    created,
    depth,
    image,
    nickName,
    like,
    dislike,
  } = commentInfo;

  const getPath = (dIndex: number) => {
    const index = dIndex + 1;
    const splitLength = depth - index;
    const pathArr = node_path ? node_path.split('.') : [];
    return pathArr.slice(0, pathArr.length - splitLength).join('.');
  };

  const handleMouseOver = (dIndex: number | null, nodePath: string | null) => {
    changeIndex(dIndex, nodePath);
  };

  const handleOpenComment = () => {
    setReply(!reply);
  };

  const isHide =
    node_path && Object.keys(hideComments).find((path) => node_path.indexOf(path) > -1);

  const showComment = !(isHide && node_path !== isHide);

  return (
    <CommentBox>
      {showComment && (
        <div>
          {new Array(depth).fill('').map((_, dIndex) => {
            const sameDepth = depth === dIndex + 1;
            if (isHide && sameDepth) {
              return null;
            }
            const path = getPath(dIndex);

            const highlight = !!(
              lineDepth &&
              lineDepth.dIndex === dIndex &&
              lineDepth.nodePath === path
            );
            return (
              <div key={`arrow_${commentId}_${dIndex}`} className="left-bar">
                {sameDepth && <ArrowTopDown like={like} dislike={dislike} />}
                <ThreadLine
                  highlight={highlight}
                  onMouseEnter={() => handleMouseOver(dIndex, path)}
                  onMouseOut={() => handleMouseOver(null, null)}
                  onClick={() => clickLine(path)}
                />
              </div>
            );
          })}
          {isHide ? (
            <div className="show-btn-box">
              <PlusCircleFilled className="show-btn" onClick={() => clickLine(isHide)} />
              <div>
                {nickName}
                {moment(created).fromNow()}
              </div>
            </div>
          ) : (
            <div className="comment-box">
              <CommentItem
                actions={[
                  <ReplySpan
                    key="comment-basic-reply-to"
                    active={reply}
                    onClick={handleOpenComment}
                  >
                    Reply
                  </ReplySpan>,
                ]}
                author={nickName}
                avatar={{ image }}
                content={content}
                created={created}
              />
              {reply && (
                <CommentAniBox isActive={reply}>
                  <QuillEditor
                    submit={submit}
                    cancel={() => setReply(false)}
                    submitInfo={commentInfo}
                  />
                </CommentAniBox>
              )}
            </div>
          )}
        </div>
      )}
    </CommentBox>
  );
};

export default CommentDetail;
