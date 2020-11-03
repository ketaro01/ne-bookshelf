import React from 'react';

// JS
import styled from 'styled-components';

// COMPONENTS
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';

const ArrowTopDownBox = styled.div`
  position: absolute;
  top: 0;
  width: 20px;
  background-color: white;
  z-index: 10;
  display: flex;
  justify-content: center;
  flex-direction: column;
  padding: 5px 0;
  color: #666;
`;

const ArrowTopDown: React.FC = () => (
  <ArrowTopDownBox>
    <ArrowUpOutlined />
    <ArrowDownOutlined />
  </ArrowTopDownBox>
);

export default ArrowTopDown;
