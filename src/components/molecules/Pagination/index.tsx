import "./styles.scss";
import { Pagination, PaginationProps } from "antd";

const AppPagination = (props: PaginationProps) => {
  const { defaultCurrent = 1, showSizeChanger = false, ...restProps } = props;
  return <Pagination defaultCurrent={defaultCurrent} showSizeChanger={showSizeChanger} {...restProps} />;
};

export default AppPagination;
