import { Flex } from "antd";
import "./styles.scss";
import { AppButton } from "@/components/atoms/button";
import { ArrowOutlinedIcon } from "@/assets/icons/custom-icon";
import { Text } from "@/components/atoms/text";
import { RightOutlined, EditOutlined } from "@ant-design/icons";
import { AppBadge } from "@/components/atoms/badge";
import { WillMethod, WillType } from "@/types";
import { useNavigate } from "react-router-dom";
import { APP_ROUTES_PATHS } from "@/constants";

interface DetailsContainerProps {
  children: React.ReactNode;
  willName: string;
  willType: WillType;
  description: string;
  active: false | {
    textSignatures: string;
  };
  method: WillMethod;
  contractId: string;
  willId: string;
}

export const DetailsContainer = (props: DetailsContainerProps) => {
  const { children, willName, willType, description, active, method, contractId, willId } = props;
  const navigate = useNavigate();

  const viewSmartContract = () => {
    if (contractId) {
      window.open(`${import.meta.env.VITE_TEST_NETWORK as string}/address/${contractId}`, '_blank');
    }
  }

  const goToEdit = () => {
    navigate(`${APP_ROUTES_PATHS.CONFIG_WILL}/${willId}`);
  }

  return (
    <Flex vertical className="app-details-container" gap="32px">
      <AppButton type="normal" onClick={() => navigate(-1)}>
        <Flex gap="16px">
          <ArrowOutlinedIcon />
          <Text size="text-lg" className="font-semibold">Back</Text>
        </Flex>
      </AppButton>
      <Flex vertical gap="24px">
        <Flex vertical gap={4}>
          <Flex gap={8} align="center">
            <Text size="text-xl" className="font-bold neutral-1 capitalize">{willName} details</Text>
            <AppBadge count={<Text size="text-md" className="white capitalize">{willType} will</Text>} color="primary" size="lg" />
          </Flex>
          <Text className="neutral-2">{description}</Text>
        </Flex>
        {children}
      </Flex>
      {
        method === "created" ? (
          <Flex justify="space-between" align="center" className="details-container--footer">
            <AppButton size="xl" rightIcon={<RightOutlined />} onClick={viewSmartContract}>
              <Text size="text-lg" className="uppercase neutral-1 font-bold">View smart contract</Text>
            </AppButton>
            <AppButton type="primary" size="xl" icon={<EditOutlined />} onClick={goToEdit}>
              <Text size="text-lg" className="uppercase white font-bold">Edit will</Text>
            </AppButton>
          </Flex>
        ) : active ? ( // inherited and active
          <Flex vertical align="flex-end" gap={10}>
            <Text className="neutral-2">{active?.textSignatures}</Text>
            <AppButton type="primary" size="xl"><Text size="text-lg" className="uppercase font-bold">Sign to receive fund</Text></AppButton>
          </Flex>
        ) : null // inherited and inactive
      }
    </Flex>
  )
}