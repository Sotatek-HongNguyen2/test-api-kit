import clsx from "clsx";
import "./styles.scss"
import { Table, TableProps } from "antd"

interface CustomTableProps extends TableProps {
  hasIconAction?: boolean;
}

export const AppTable = (props: CustomTableProps) => {
  const {
    hasIconAction = false,
    className,
    ...restProps
  } = props;
  return (
    <Table
      className={clsx(className, hasIconAction && "has-icon-action")}
      {...restProps}
    />
  )
}