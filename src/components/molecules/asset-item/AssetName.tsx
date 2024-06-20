import "./styles.scss";
import { Text } from "@/components/atoms/text";
import { AssetData } from "@/types";
import { Flex } from "antd";
import clsx from "clsx";

interface AssetNameProps {
  asset?: AssetData;
  showSign?: boolean;
  iconClassName?: string;
}

export const AssetName = (props: AssetNameProps) => {
  const { asset, showSign = true, iconClassName } = props;
  if (!asset) return null;
  return (
    <Flex align="center" gap="10px">
      <img
        src={asset?.assetIcon}
        alt="asset-icon"
        className={clsx("asset-icon", iconClassName)}
      />
      <Flex vertical>
        <Text className="font-semibold neutral-1">{asset?.name}</Text>
        {showSign && <Text className="neutral-2">{asset?.sign}</Text>}
      </Flex>
    </Flex>
  );
};
