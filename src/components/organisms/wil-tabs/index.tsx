import { Tabs, TabsProps } from "antd";

import "./styles.scss";

import { useEffect, useState } from "react";

import { useDevices } from "@/hooks/useMediaQuery";
import useQuery from "@/hooks/useQuery";

import { WillList, WillListProps } from "./will-list";
import { useSearchParams } from "react-router-dom";

type WillType = WillListProps['type'];

export const WillTabs = () => {
  const { isTablet } = useDevices();
  const [willType, setWillType] = useState<WillType>("created");

  const query = useQuery();
  const [searchParams, setSearchParams] = useSearchParams();

  const items: TabsProps["items"] = [
    {
      key: "created",
      label: "My will",
      children: <WillList />,
    },
    {
      key: "inherited",
      label: "My inherited will",
      children: <WillList />,
    },
  ];

  const getComponent = () => {
    switch (willType) {
      case "created":
        return <WillList />;
      case "inherited":
        return <WillList />;
      default:
        return null;
    }
  };

  useEffect(() => {
    const willType = searchParams.get("willType") || "created";
    setSearchParams({ willType: willType });
    setWillType(willType as WillType);
  }, [searchParams]);

  const handleChangeTab = (key: string) => {
    setSearchParams({ willType: key });
  }

  return !isTablet ? (
    <Tabs activeKey={willType} items={items} onChange={handleChangeTab} />
  ) : (
    getComponent()
  );
};
