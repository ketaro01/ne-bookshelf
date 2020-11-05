import { Request, Response } from 'express';

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

console.log(commentList.length);

const getPost = (req: Request, res: Response) => {
  const { postId } = req.params;
  const data = postList.find((item) => item.postId === parseInt(postId, 10));
  if (!data) {
    return res.status(404).json({ error: 'not found' });
  }
  return res.json(data);
};

export default {
  'GET /api/thread/post/:postId': getPost,
};
