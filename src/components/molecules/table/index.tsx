import clsx from "clsx";
import "./styles.scss"
import { Table, TableProps } from "antd"
import { useMemo } from "react";

interface CustomTableProps extends TableProps {
  hasIconAction?: boolean;
}

export const AppTable = (props: CustomTableProps) => {
  const {
    hasIconAction = false,
    className,
    columns,
    dataSource,
    ...restProps
  } = props;


  const actualColumns = useMemo(() => {
    if (hasIconAction && dataSource && dataSource?.length > 0) return columns;
    else if (columns && hasIconAction && dataSource && dataSource?.length === 0) {
      const columnsClone = [...columns];
      columnsClone?.pop();
      return columnsClone;
    }
    return columns ?? [];
  }, [hasIconAction, columns])

  return (
    <Table
      className={clsx(className, hasIconAction && "has-icon-action")}
      columns={actualColumns as any}
      dataSource={dataSource}
      {...restProps}
    />
  )
}