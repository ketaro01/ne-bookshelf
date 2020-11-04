import React from 'react';

// JS
import styled from 'styled-components';

// COMPONENTS
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';

interface IArrowTopDownProps {
  clickUp?: () => void;
  clickDown?: () => void;
}

const defaultProps: IArrowTopDownProps = {
  clickUp: () => console.error('invalid function'),
  clickDown: () => console.error('invalid function'),
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
`;

const ArrowTopDown: React.FC<IArrowTopDownProps> = ({ clickUp, clickDown }) => (
  <ArrowTopDownBox>
    <ArrowUpOutlined className="icons" onClick={clickUp} />
    <ArrowDownOutlined className="icons" onClick={clickDown} />
  </ArrowTopDownBox>
);

ArrowTopDown.defaultProps = defaultProps;

export default ArrowTopDown;
