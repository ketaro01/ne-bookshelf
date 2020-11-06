import { Request, Response } from 'express';
import * as R from 'ramda';
import { CommentItemType } from '@/pages/commentThreads/data';

const postList = [
  {
    postId: 1,
    userId: 'liamyoon',
    nickName: 'liamyoon',
    title: 'kt nexr thread post',
    content: 'kt nexr thread content',
    created: '2020-11-01T21:21:41.052Z',
    like: 1862,
    dislike: 333,
  },
];

let commentList = [
  {
    commentId: 1,
    commentParentId: 1,
    content: 'Thread Start!',
    node_path: '1',
    depth: 1,
    created: '2020-11-02T21:21:41.052Z',
  },
  {
    commentId: 3,
    commentParentId: 1,
    content: 'Thread 1.3!!',
    node_path: '1.3',
    depth: 2,
    created: '2020-11-02T21:21:41.052Z',
  },
  {
    commentId: 4,
    commentParentId: 1,
    content: 'Thread 1.4!!',
    node_path: '1.4',
    depth: 2,
    created: '2020-11-02T21:21:41.052Z',
  },
  {
    commentId: 5,
    commentParentId: 1,
    content: 'Thread 4.5!!',
    node_path: '1.4.5',
    depth: 3,
    created: '2020-11-02T21:21:41.052Z',
  },
  {
    commentId: 2,
    commentParentId: 1,
    content: 'Thread Two Start!',
    node_path: '2',
    depth: 1,
    created: '2020-11-02T21:21:41.052Z',
  },
  {
    commentId: 6,
    commentParentId: 1,
    content: 'Thread 2.6 Start!',
    node_path: '2.6',
    depth: 2,
    created: '2020-11-02T21:21:41.052Z',
  },
  {
    commentId: 8,
    commentParentId: 1,
    content: 'Thread 2.6.8 Start!',
    node_path: '2.6.8',
    depth: 3,
    created: '2020-11-02T21:21:41.052Z',
  },
  {
    commentId: 9,
    commentParentId: 1,
    content: 'Thread 2.6.8.9 Start!',
    node_path: '2.6.8.9',
    depth: 4,
    created: '2020-11-02T21:21:41.052Z',
  },
  {
    commentId: 10,
    commentParentId: 1,
    content: 'Thread 2.6.8.9.10 Start!',
    node_path: '2.6.8.9.10',
    depth: 5,
    created: '2020-11-02T21:21:41.052Z',
  },
  {
    commentId: 7,
    commentParentId: 1,
    content: 'Thread 2.7 Start!',
    node_path: '2.7',
    depth: 2,
    created: '2020-11-02T21:21:41.052Z',
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

const randomUserId = [
  'a1234',
  'auTestas',
  'acascas2',
  'cnclksanl',
  'rhdgurwns',
  'yapyap30',
  'limaaa',
];

commentList = commentList.map((item) => {
  return {
    ...item,
    nickName: randomName[Math.floor(Math.random() * randomName.length)],
    userId: randomUserId[Math.floor(Math.random() * randomUserId.length)],
    image:
      'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
    like: 0,
    dislike: 0,
  };
});

const getPost = (req: Request, res: Response) => {
  const { postId } = req.params;
  const data = postList.find((item) => item.postId === parseInt(postId, 10));
  if (!data) {
    return res.status(404).json({ error: 'not found' });
  }
  return res.json(data);
};

const getCommentList = (req: Request, res: Response) => {
  const { postId } = req.params;
  if (!postId) return res.status(400).json({ error: 'invalid postId' });
  const list = R.pipe(
    R.filter(R.propEq('commentParentId', parseInt(postId, 10))),
    R.sortBy(R.prop('node_path')),
  )(commentList);

  return res.json(list);
};

const postComment = (req: Request, res: Response): void => {
  switch (req.method) {
    case 'POST':
      (() => {
        let item: CommentItemType = req.body;
        if (!item || !item.commentParentId)
          return res.status(400).json({ error: 'invalid parameters' });
        const maxId = Math.max(...R.map(R.prop('commentId'))(commentList));
        item.commentId = maxId ? maxId + 1 : 0;
        item = {
          ...item,
          node_path: item.node_path
            ? `${item.node_path}.${item.commentId}`
            : String(item.commentId),
          depth: item.depth ? item.depth + 1 : 1,
          image:
            'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
          like: 0,
          dislike: 0,
        };

        commentList.push(item);

        return res.json(item);
      })();
      return;
    case 'DELETE':
      (() => {
        const { commentId } = req.params;
        if (!commentId) return res.status(400).json({ error: 'invalid parameters' });

        const itemIndex = R.findIndex(R.propEq('commentId', parseInt(commentId, 10)))(commentList);
        if (itemIndex < 0) return res.status(404).json({ error: 'not find item' });

        const nextList = R.filter(R.compose(R.not, R.propEq('commentId', parseInt(commentId, 10))))(
          commentList,
        );
        if (nextList) commentList = nextList;

        return res.json({ success: true });
      })();
      return;
    case 'PUT':
      (() => {
        const { commentId } = req.params;
        const item: CommentItemType = req.body;

        if (!commentId || !item) return res.status(400).json({ error: 'invalid parameters' });

        const itemIndex = R.findIndex(R.propEq('commentId', parseInt(commentId, 10)))(commentList);
        if (itemIndex < 0) return res.status(404).json({ error: 'not find item' });

        commentList[itemIndex] = {
          ...commentList[itemIndex],
          ...item,
        };

        return res.json({ success: true });
      })();
      return;
    default:
      break;
  }
  res.status(500);
};

export default {
  'GET /api/thread/post/:postId': getPost,
  'GET /api/thread/comment/:postId': getCommentList,
  'POST /api/thread/comment': postComment,
  'DELETE /api/thread/comment/:commentId': postComment,
  'PUT /api/thread/comment/:commentId': postComment,
};
