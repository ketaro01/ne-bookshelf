import React from 'react';
import ArrowTopDown from '@/pages/commentThreads/components/ArrowTopDown';
import styled, { css } from 'styled-components';
import { CommentItemType } from '@/pages/commentThreads/data';

interface IDepthLineProps {
  isHide?: string;
  lineDepth?: {
    dIndex: number | null;
    nodePath: string | null;
  } | null;
  commentInfo?: CommentItemType;
  mouseOver: (dIndex: number | null, nodePath: string | null) => void;
  clickLine: (nodePath: string | null) => void;
}

const defaultProps: IDepthLineProps = {
  mouseOver: () => console.error('invalid func'),
  clickLine: () => console.error('invalid func'),
};

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

const DepthLine: React.FC<IDepthLineProps> = (props) => {
  const { isHide, lineDepth, commentInfo, mouseOver, clickLine } = props;

  const { commentId = 0, node_path = '', depth = 0, like = 0, dislike = 0 } = commentInfo || {};

  const getPath = (dIndex: number) => {
    const index = dIndex + 1;
    const splitLength = depth - index;
    const pathArr = node_path ? node_path.split('.') : [];
    return pathArr.slice(0, pathArr.length - splitLength).join('.');
  };

  const rangeArr = Array.from(Array(depth));

  return (
    <>
      {rangeArr.map((_, dIndex) => {
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

        const key = `arrow_${commentId}_${dIndex}`;

        return (
          <div key={key} className="left-bar">
            {sameDepth && <ArrowTopDown like={like} dislike={dislike} />}
            <ThreadLine
              highlight={highlight}
              onMouseEnter={() => mouseOver(dIndex, path)}
              onMouseOut={() => mouseOver(null, null)}
              onClick={() => clickLine(path)}
            />
          </div>
        );
      })}
    </>
  );
};

DepthLine.defaultProps = defaultProps;

export default DepthLine;
