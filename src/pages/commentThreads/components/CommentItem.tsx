import React, { ReactNode } from 'react';
import { Avatar, Comment, Tooltip } from 'antd';
import moment from 'moment';

interface ICommentItemProps {
  author?: string;
  avatar?: {
    image?: string | null;
  };
  content: string;
  actions?: ReactNode[];
  created?: string;
}

const defaultProps: ICommentItemProps = {
  content: '',
};

const CommentItem: React.FC<ICommentItemProps> = (props) => {
  const { author, avatar, content, actions, created } = props;
  const mtCreated = created && moment(created);
  return (
    <Comment
      actions={actions}
      author={author && <a>{author}</a>}
      avatar={avatar && <Avatar src={avatar.image || undefined} alt={author} />}
      content={<div dangerouslySetInnerHTML={{ __html: content }} />}
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
