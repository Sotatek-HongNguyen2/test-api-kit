import {
  CustomRadioItemProps,
  RadioGroup,
} from "@/components/molecules/radio-group";
import { SearchInput } from "@/components/molecules/search-input";
import { Flex } from "antd";
import { WillListProps } from ".";

const items: CustomRadioItemProps[] = [
  {
    id: 1,
    title: "All",
    value: "all",
  },
  {
    id: 2,
    title: "Inheritance",
    value: "inheritance",
  },
  {
    id: 3,
    title: "Forwarding",
    value: "forwarding",
  },
  // {
  //   id: 4,
  //   title: "Destruction",
  //   value: "destruction",
  // },
];

interface WillFilterProps extends Pick<WillListProps, "type"> {
  onSearch: (value: string | undefined) => void;
  onFilter: (value: CustomRadioItemProps["value"]) => void;
}

export const WillFilter = ({ onSearch, onFilter, type }: WillFilterProps) => {
  return (
    <Flex vertical className="will-filter--container" gap="24px">
      <SearchInput
        placeholder="Search by will name"
        onHandleSearch={onSearch}
      />
      <RadioGroup
        title="Type"
        items={
          type === "created"
            ? items
            : items?.filter((item) => item.value !== "destruction")
        }
        onChange={onFilter}
      />
    </Flex>
  );
};
