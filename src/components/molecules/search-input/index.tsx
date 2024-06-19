import "./styles.scss";
import { Input, InputProps } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useCallback, useEffect, useRef } from "react";

import { useIsMounted } from "@/hooks/useIsMounted";
import { useDebounce } from "@/hooks/useDebounce";

interface SearchInputProps extends InputProps {
  initValue?: string;
  onHandleSearch: (value: string | undefined) => void;
}

export const SearchInput = (props: SearchInputProps) => {
  const { initValue, onHandleSearch, ...restProps } = props;

  const [debounceSearchValue, setSearchValue, value] = useDebounce(initValue);

  const searchRef =
    useRef<HTMLInputElement>() as React.RefObject<HTMLInputElement>;
  const isMounted = useIsMounted();

  const memoHandleSearch = useCallback(onHandleSearch, [onHandleSearch]);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  useEffect(() => {
    setSearchValue(initValue || "");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initValue]);

  useEffect(() => {
    if (!isMounted()) return;
    const searchValue =
      debounceSearchValue && debounceSearchValue.trim()
        ? debounceSearchValue.trim().toLowerCase()
        : undefined;

    memoHandleSearch(searchValue);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounceSearchValue, isMounted]);

  return (
    <Input
      addonBefore={<SearchOutlined />}
      value={value}
      onChange={handleChange}
      {...restProps}
    />
  );
};
