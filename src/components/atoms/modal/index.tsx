import { Modal } from "antd";
import "./styles.scss";

interface IWillModal {
  open: boolean;
  className?: string;
  handleOk?: () => void;
  handleCancel?: () => void;
  children: React.ReactNode;
  title?: string;
  hideFooter?: boolean;
  width?: number;
}

const WillModal = ({
  open,
  className,
  handleOk,
  handleCancel,
  children,
  title,
  width,
  hideFooter,
}: IWillModal) => {
  return (
    <Modal
      maskClosable={false}
      width={width && width}
      footer={hideFooter && null}
      className={`${className && className}`}
      title={title}
      centered
      open={open}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      {children}
    </Modal>
  );
};

export default WillModal;
