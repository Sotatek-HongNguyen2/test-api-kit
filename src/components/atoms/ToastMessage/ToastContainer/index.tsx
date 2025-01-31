import React from "react";
import { Flex } from "antd";

import { TOAST_TYPE } from "..";
import "./styles.scss";
interface IToastWrapper {
  headContent?: React.ReactNode;
  bodyContent?: React.ReactNode;
  type?: TOAST_TYPE;
}

const ToastWrapper: React.FC<IToastWrapper> = ({
  bodyContent,
  headContent,
}) => {
  const isHeadContentString = typeof headContent === "string";

  const splitedContent = isHeadContentString
    ? (headContent as string)?.split(". ")
    : (headContent as any);

  const renderSplittedContent = () => {
    if (!isHeadContentString) {
      return;
    }

    return splitedContent?.map((mapItem: any, i: any) => (
      <div className="toast-body__top" key={i}>
        {mapItem + (i === 0 ? "." : "")}
      </div>
    ));
  };

  return (
    <div className="toast-body">
      {isHeadContentString &&
      splitedContent?.length > 1 &&
      (headContent as string)?.length > 50 ? (
        <Flex gap={4} vertical>
          {renderSplittedContent()}
        </Flex>
      ) : (
        <div className="toast-body__top">{headContent}</div>
      )}

      <div className="toast-body__bottom">{bodyContent}</div>
    </div>
  );
};

export default ToastWrapper;
