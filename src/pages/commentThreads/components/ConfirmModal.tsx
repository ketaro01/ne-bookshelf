import React, { useEffect, useState } from 'react';
import { Modal } from 'antd';

interface IConfirmModalProps {
  openModal: boolean;
  modalInfo: {
    title?: string;
    okText?: string;
    cancelText?: string;
    onClickOk?: (data?: any) => void;
    onClickCancel?: (data?: any) => void;
  };
  data?: any;
}

const defaultProps: IConfirmModalProps = {
  openModal: false,
  modalInfo: {
    title: 'Modal',
    okText: 'Ok',
    cancelText: 'Cancel',
    onClickOk: () => console.error('invalid func'),
    onClickCancel: () => console.error('invalid func'),
  },
  data: null,
};

const ConfirmModal: React.FC<IConfirmModalProps> = ({ openModal, modalInfo, data, children }) => {
  const [show, setShow] = useState(openModal);
  useEffect(() => {
    setShow(openModal);
  }, [openModal]);

  const hideModal = () => {
    setShow(false);
  };

  const handleOnClickOk = () => {
    hideModal();
    if (!modalInfo.onClickOk) return;
    modalInfo.onClickOk(data);
  };

  const handleOnClickCancel = () => {
    hideModal();
    if (!modalInfo.onClickCancel) return;
    modalInfo.onClickCancel(data);
  };

  return (
    <Modal
      title={modalInfo.title}
      visible={show}
      onOk={handleOnClickOk}
      onCancel={handleOnClickCancel}
      okText={modalInfo.okText}
      cancelText={modalInfo.cancelText}
    >
      {children}
    </Modal>
  );
};

ConfirmModal.defaultProps = defaultProps;

export default ConfirmModal;
