import React, { ReactNode } from 'react';
import { Avatar, Comment, Tooltip } from 'antd';
import moment from 'moment';
import QuillEditor from '@/pages/commentThreads/components/QuillEditor';

interface ICommentItemProps {
  author?: string;
  avatar?: {
    image?: string | null;
  };
  isEdit: boolean;
  content?: string;
  actions?: ReactNode[];
  created?: string;
}

const defaultProps: ICommentItemProps = {
  content: '',
  isEdit: false,
};

const CommentItem: React.FC<ICommentItemProps> = (props) => {
  const { isEdit, author, avatar, content, actions, created } = props;
  const mtCreated = created && moment(created);

  const ContentBox = () =>
    isEdit ? (
      <div style={{ height: 200 }}>
        <QuillEditor
          submit={async (submitInfo: any, value: string) => {
            console.log(submitInfo, value);
            return true;
          }}
          initValue={content}
          cancel={() => {}}
          submitInfo={{}}
        />
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
