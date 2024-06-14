import _ from "lodash";
import { ToastOptions, toast } from "react-toastify";

import ToastWrapper from "./ToastContainer";

export enum TOAST_TYPE {
  SUCCESS = "success",
  ERROR = "error",
  WARNING = "warning",
  INFO = "info",
}

const WillToast = (() => {
  const toastClone = _.cloneDeep(toast);

  const toastRender = (type: TOAST_TYPE) => {
    return (
      headContent?: React.ReactNode,
      bodyContent?: React.ReactNode,
      options?: ToastOptions
    ) =>
      toast[type](
        <ToastWrapper
          type={type}
          headContent={headContent}
          bodyContent={bodyContent}
        />,
        options
      );
  };

  return {
    ...toastClone,
    [TOAST_TYPE.INFO]: toastRender(TOAST_TYPE.INFO),
    [TOAST_TYPE.ERROR]: toastRender(TOAST_TYPE.ERROR),
    [TOAST_TYPE.WARNING]: toastRender(TOAST_TYPE.WARNING),
    [TOAST_TYPE.SUCCESS]: toastRender(TOAST_TYPE.SUCCESS),
  };
})();

export default WillToast;
