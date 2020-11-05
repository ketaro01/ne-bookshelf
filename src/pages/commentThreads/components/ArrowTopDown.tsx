import React from 'react';

// JS
import styled from 'styled-components';
import numeral from 'numeral';

// COMPONENTS
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';

interface IArrowTopDownProps {
  clickUp?: () => void;
  clickDown?: () => void;
  like: number;
  dislike: number;
}

const defaultProps: IArrowTopDownProps = {
  clickUp: () => console.error('invalid function'),
  clickDown: () => console.error('invalid function'),
  like: 0,
  dislike: 0,
};

const ArrowTopDownBox = styled.div`
  position: absolute;
  top: 0;
  width: 26px;
  background-color: white;
  z-index: 10;
  display: flex;
  justify-content: center;
  flex-direction: column;
  padding: 5px 0;
  color: #666;
  .icons {
    cursor: pointer;
    transition: all 0.25s;
    &:hover {
      color: black;
      transform: scale(1.2);
    }
  }
  .like-box {
    font-size: 10px;
    font-weight: bold;
    text-align: center;
    height: 12px;
  }
`;

const ArrowTopDown: React.FC<IArrowTopDownProps> = ({ clickUp, clickDown, like, dislike }) => {
  const count = like - dislike;
  return (
    <ArrowTopDownBox>
      <ArrowUpOutlined className="icons" onClick={clickUp} />
      {count !== 0 && (
        <div className="like-box">
          {count <= -1000 || count >= 1000 ? numeral(count).format('0.0a') : count}
        </div>
      )}
      <ArrowDownOutlined className="icons" onClick={clickDown} />
    </ArrowTopDownBox>
  );
};

ArrowTopDown.defaultProps = defaultProps;

export default ArrowTopDown;
