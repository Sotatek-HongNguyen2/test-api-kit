import "./styles.scss";
import { useEffect, useState, useCallback } from "react";
import { Input, InputProps } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { debounce } from "lodash";

interface SearchInputProps extends InputProps {
  initValue?: string;
  onHandleSearch: (value: string | undefined) => void;
}

export const SearchInput = (props: SearchInputProps) => {
  const { initValue, onHandleSearch, ...restProps } = props;
  const [value, setValue] = useState(initValue || "");

  const debouncedHandleSearch = useCallback(
    debounce((value: string) => {
      onHandleSearch(value.trim());
      setValue(value.trim());
    }, 600),
    []
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValue(newValue.trimStart());
    debouncedHandleSearch(newValue);
  };

  useEffect(() => {
    return () => {
      debouncedHandleSearch.cancel();
    };
  }, [debouncedHandleSearch]);

  return (
    <Input
      addonBefore={<SearchOutlined />}
      value={value}
      onChange={handleChange}
      {...restProps}
    />
  );
};
