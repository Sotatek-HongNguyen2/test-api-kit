import { Col, Drawer, Row, Space } from "antd";
import { useState } from "react";

import { AppSelect } from "@/components/atoms/select";
import { AppButton, IconButton } from "@/components/atoms/button";
import { Close } from "@/assets/icons";
import { Text } from "@/components/atoms/text";

import { SearchInput } from "../search-input";
import { CustomRadioItemProps, RadioGroup } from "../radio-group";
import "./styles.scss";

interface DrawerSelectProps {
  onSearch: (value: string | undefined) => void;
  onFilter: (value: CustomRadioItemProps["value"]) => void;
}
export const DrawerSelect = ({ onSearch, onFilter }: DrawerSelectProps) => {
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);

  const showDrawer = () => {
    setIsDrawerVisible(true);
  };

  const closeDrawer = () => {
    setIsDrawerVisible(false);
  };

  const [selectedOption, setSelectedOption] = useState<string>("all");
  const [selectedOptionDraft, setSelectedOptionDraft] = useState<string>("");

  const configOptions: CustomRadioItemProps[] = [
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

  const optionsSelect = [
    {
      label: "All",
      value: "all",
    },
    {
      label: "Inheritance",
      value: "inheritance",
    },
    {
      label: "Forwarding",
      value: "forwarding",
    },
    // {
    //   label: "Destruction",
    //   value: "destruction",
    // },
  ];

  const handleChangeOption = (e: any) => {
    setSelectedOptionDraft(e);
  };

  const handleConfirmOption = () => {
    setSelectedOption(selectedOptionDraft);
    onFilter(selectedOption);
    closeDrawer();
  };

  return (
    <>
      <Row gutter={12}>
        <Col span={14}>
          <SearchInput
            placeholder="Search by will name"
            onHandleSearch={onSearch}
          />
        </Col>
        <Col span={10}>
          <AppSelect
            value={selectedOption}
            options={optionsSelect}
            open={false}
            onClick={showDrawer}
            // onChange={onFilter}
            style={{ width: "100%" }}
          ></AppSelect>
        </Col>
      </Row>
      <Drawer
        title={<div className="title-drawer-select">Type</div>}
        className="drawer-select"
        placement={"bottom"}
        closable={false}
        open={isDrawerVisible}
        extra={
          <Space>
            <IconButton onClick={closeDrawer}>
              <Close />
            </IconButton>
          </Space>
        }
        key={"bottom"}
        height={295}
      >
        <RadioGroup onChange={handleChangeOption} items={configOptions} />
        <Row gutter={24} className="mt-5">
          <Col span={12}>
            <AppButton
              block
              size="large"
              type="primary"
              htmlType="submit"
              onClick={handleConfirmOption}
            >
              <Text size="text-lg" className="uppercase font-bold">
                confirm
              </Text>
            </AppButton>
          </Col>
          <Col span={12}>
            <AppButton
              block
              size="large"
              className="transparent"
              onClick={closeDrawer}
            >
              <Text size="text-lg" className="uppercase font-bold">
                Cancel
              </Text>
            </AppButton>
          </Col>
        </Row>
      </Drawer>
    </>
  );
};
