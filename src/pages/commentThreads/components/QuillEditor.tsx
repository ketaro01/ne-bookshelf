import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import styled from 'styled-components';

import 'react-quill/dist/quill.snow.css';
import { Button } from 'antd';

interface IQuillEditorProps {
  changeValue?: (value: string) => void;
  submit?: (value: string) => void;
}

const EditorBox = styled.div<{ useSubmit?: boolean }>`
  width: 100%;
  height: 100%;
  .quill {
    height: ${(props) => (props.useSubmit ? 'calc(100% - 40px)' : '100%')};
    .ql-container {
      height: calc(100% - 42px);
    }
  }
  .quill-submit {
    height: 40px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
`;

const QuillEditor: React.FC<IQuillEditorProps> = ({ changeValue, submit }) => {
  const [value, setValue] = useState('');

  const onChangeValue = (content: string): void => {
    if (value === content) return;
    if (changeValue) changeValue(content);
    setValue(content);
  };
  const onClickSubmit = (): void => {
    if (!submit) return;
    submit(value);
  };
  return (
    <EditorBox useSubmit={!!submit}>
      <ReactQuill theme="snow" value={value} onChange={onChangeValue} />
      {submit && (
        <div className="quill-submit">
          <Button type="primary" onClick={onClickSubmit}>
            Submit
          </Button>
        </div>
      )}
    </EditorBox>
  );
};

export default QuillEditor;
