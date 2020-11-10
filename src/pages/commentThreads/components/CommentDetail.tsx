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
import ConfirmModal from '@/pages/commentThreads/components/ConfirmModal';
import { notification } from 'antd';

interface ICommentProps {
  commentInfo: CommentItemType;
  changeIndex: (dIndex: number | null, nodePath: string | null) => void;
  clickLine: (nodePath: string | null) => void;
  lineDepth?: {
    dIndex: number | null;
    nodePath: string | null;
  } | null;
  hideComments: object;
  submitComment: (submitInfo: CommentItemType, value: string) => Promise<any>;
  updateComment: (submitInfo: CommentItemType, value: string) => Promise<any>;
  deleteComment: (commentInfo: CommentItemType) => Promise<any>;
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

const ActionSpan = styled.span<{ active?: boolean }>`
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
  submitComment,
  updateComment,
  deleteComment,
}) => {
  const [reply, setReply] = useState(false);
  const [edit, setEdit] = useState(false);
  const [del, setDel] = useState(false);

  const {
    content,
    commentId,
    node_path,
    created,
    depth = 0,
    image,
    nickName,
    like = 0,
    dislike = 0,
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

  const handleOpenComment = (type?: string): void => {
    if (type === 'replay') {
      setReply(!reply);
    }
    if (type === 'edit') {
      setEdit(!edit);
    }

    if (type === 'delete') {
      setDel(!del);
    }
  };

  const handleUpdate = async (submitInfo: CommentItemType, value: string) => {
    const result = await updateComment(submitInfo, value);
    if (result) setEdit(false);
  };

  const handleDelete = async () => {
    if (!commentInfo) {
      notification.warn({
        message: '경고',
        description: '필수정보 "commentId" 가 존재하지 않습니다.',
      });
      return;
    }

    await deleteComment(commentInfo);
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
                actions={
                  !commentInfo.isDeleted
                    ? [
                        <ActionSpan
                          key="comment-basic-reply-to"
                          active={reply}
                          onClick={() => handleOpenComment('replay')}
                        >
                          코멘트
                        </ActionSpan>,
                        <ActionSpan
                          key="comment-basic-edit-to"
                          active={edit}
                          onClick={() => handleOpenComment('edit')}
                        >
                          수정
                        </ActionSpan>,
                        <ActionSpan
                          key="comment-basic-delete-to"
                          onClick={() => handleOpenComment('delete')}
                        >
                          삭제
                        </ActionSpan>,
                      ]
                    : []
                }
                isEdit={edit}
                author={nickName}
                avatar={{ image }}
                content={content}
                created={created}
                commentInfo={commentInfo}
                update={handleUpdate}
              />
              {reply && (
                <CommentAniBox>
                  <QuillEditor
                    submit={submitComment}
                    cancel={() => setReply(false)}
                    submitInfo={commentInfo}
                  />
                </CommentAniBox>
              )}
            </div>
          )}
        </div>
      )}
      <ConfirmModal
        openModal={del}
        modalInfo={{
          title: '코멘트 삭제',
          okText: '삭제',
          cancelText: '취소',
          onClickOk: handleDelete,
          onClickCancel: () => setDel(false),
        }}
      >
        해당 코멘트를 삭제하시겠습니까?
      </ConfirmModal>
    </CommentBox>
  );
};

export default CommentDetail;
