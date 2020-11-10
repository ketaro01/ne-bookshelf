import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import styled from 'styled-components';

import 'react-quill/dist/quill.snow.css';
import { Button, Spin } from 'antd';

interface IQuillEditorProps {
  changeValue?: (value: string) => void;
  submit?: (submitInfo: any, value: string) => Promise<any>;
  cancel?: (result: boolean) => void;
  submitInfo?: object;
  pending?: boolean;
  initValue?: string;
}

const EditorBox = styled.div<{ useSubmit?: boolean }>`
  width: 100%;
  height: 100%;
  .ant-spin-nested-loading {
    height: ${(props) => (props.useSubmit ? 'calc(100% - 40px)' : '100%')};
    > .ant-spin-container {
      height: 100%;
    }
    .quill {
      height: 100%;
      .ql-container {
        height: calc(100% - 42px);
      }
    }
  }
  .quill-submit {
    height: 40px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    > button {
      margin-left: 5px;
    }
  }
`;

const QuillEditor: React.FC<IQuillEditorProps> = ({
  changeValue,
  submit,
  cancel,
  pending,
  submitInfo,
  initValue,
}) => {
  const [value, setValue] = useState(initValue || '');
  const [submitPending, setSubmitPending] = useState(false);
  const isPending = pending || submitPending;

  const onChangeValue = (content: string): void => {
    if (value === content) return;
    if (changeValue) changeValue(content);
    setValue(content);
  };

  const onClickCancel = () => {
    if (!cancel) return;
    cancel(true);
  };

  const onClickSubmit = async (): Promise<void> => {
    if (!submit) return;
    setSubmitPending(true);
    try {
      const result = await submit(submitInfo || {}, value);
      console.log(result);
      if (result) {
        setValue('');
        onChangeValue('');
        onClickCancel();
      }
    } catch (e) {
      console.error(e.message);
    } finally {
      setSubmitPending(false);
    }
  };

  return (
    <EditorBox useSubmit={!!submit}>
      <Spin spinning={isPending} style={{ height: '100%' }}>
        <ReactQuill theme="snow" value={value} onChange={onChangeValue} />
      </Spin>
      {submit && (
        <div className="quill-submit">
          {cancel && <Button onClick={onClickCancel}>Cancel</Button>}
          <Button type="primary" onClick={onClickSubmit}>
            Submit
          </Button>
        </div>
      )}
    </EditorBox>
  );
};

export default QuillEditor;
