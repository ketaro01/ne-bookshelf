import React, { ReactNode } from 'react';
import { Avatar, Comment, Tooltip } from 'antd';
import moment from 'moment';
import QuillEditor from '@/pages/commentThreads/components/QuillEditor';
import { CommentItemType } from '@/pages/commentThreads/data';

interface ICommentItemProps {
  author?: string;
  avatar?: {
    image?: string | null;
  };
  isEdit?: boolean;
  content?: string;
  actions?: ReactNode[];
  created?: string;
  commentInfo?: CommentItemType;
  update?: (submitInfo: CommentItemType, value: string) => Promise<any>;
}

const defaultProps: ICommentItemProps = {
  content: '',
  isEdit: false,
};

const CommentItem: React.FC<ICommentItemProps> = (props) => {
  const { commentInfo, isEdit, author, avatar, content, actions, created, update } = props;

  const mtCreated = created && moment(created);

  const ContentBox = () =>
    isEdit ? (
      <div style={{ height: 200 }}>
        <QuillEditor submit={update} initValue={content} submitInfo={commentInfo} />
      </div>
    ) : (
      content && <div dangerouslySetInnerHTML={{ __html: content }} />
    );
  return (
    <Comment
      actions={actions}
      author={author && <a>{author}</a>}
      avatar={avatar && <Avatar src={avatar.image || undefined} alt={author} />}
      content={ContentBox()}
      datetime={
        mtCreated && (
          <Tooltip title={mtCreated.format('YYYY-MM-DD HH:mm:ss')}>
            <span>{mtCreated.fromNow()}</span>
          </Tooltip>
        )
      }
    />
  );
};

CommentItem.defaultProps = defaultProps;

export default CommentItem;
