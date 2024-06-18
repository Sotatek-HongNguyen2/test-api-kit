import { IconProps, ToastContainer } from "react-toastify";

import {
  IconError,
  IconSuccess,
  ToastCloseIcon,
  ToastInfoIcon,
} from "@/assets/icons";

const ToastContext = () => {
  return (
    <ToastContainer
      icon={(props: IconProps) => {
        switch (props.type) {
          case "info":
            return <ToastInfoIcon />;
          case "error":
            return <IconError />;
          case "success":
            return <IconSuccess />;
          case "warning":
            return <ToastInfoIcon />;
          case "default":
            return <IconSuccess />;
          default:
            return <IconSuccess />;
        }
      }}
      closeButton={() => (
        <div style={{ cursor: "pointer" }}>
          <ToastCloseIcon />
        </div>
      )}
      bodyClassName="body-toast"
      toastClassName={(props) => {
        switch (props?.type as any) {
          case "info":
            return "wrapper-toast wrapper-info-toast";
          case "error":
            return "wrapper-toast wrapper-error-toast";
          case "success":
            return "wrapper-toast wrapper-success-toast";
          case "warning":
            return "wrapper-toast wrapper-warning-toast";
          case "dark":
            return "wrapper-toast wrapper-dark-toast";
          case "default":
            return "wrapper-toast";
          default:
            return "wrapper-toast";
        }
      }}
      closeOnClick
      autoClose={5000}
      draggable={false}
      hideProgressBar={true}
      pauseOnHover={false}
      position="top-right"
      limit={5}
      pauseOnFocusLoss={false}
    />
  );
};

export default ToastContext;
