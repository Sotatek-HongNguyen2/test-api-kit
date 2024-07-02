import { Tabs, TabsProps } from "antd";

import "./styles.scss";

import { useEffect, useState } from "react";

import { useDevices } from "@/hooks/useMediaQuery";
import useQuery from "@/hooks/useQuery";

import { WillList } from "./will-list";

export const WillTabs = () => {
  const { isTablet } = useDevices();
  const [willType, setWillType] = useState<string>("");

  const query = useQuery();

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "My will",
      children: <WillList type="created" />,
    },
    {
      key: "2",
      label: "My inherited will",
      children: <WillList type="inherited" />,
    },
  ];

  const getComponent = () => {
    switch (willType) {
      case "1":
        return <WillList type="created" />;
      case "2":
        return <WillList type="inherited" />;
      default:
        return <WillList type="created" />;
    }
  };

  useEffect(() => {
    const str = query.get("typeWill");
    if (str) setWillType(str);
  }, [query.get("typeWill")]);

  return !isTablet ? (
    <Tabs defaultActiveKey="1" items={items} />
  ) : (
    getComponent()
  );
};
