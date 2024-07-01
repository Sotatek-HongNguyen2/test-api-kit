import { Flex } from "antd";

import "./styles.scss";
import { RightOutlined, EditOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

import { AppButton } from "@/components/atoms/button";
import { ArrowOutlinedIcon } from "@/assets/icons/custom-icon";
import { Text } from "@/components/atoms/text";
import { AppBadge } from "@/components/atoms/badge";
import { WillMethod, WillType } from "@/types";
import { APP_ROUTES_PATHS } from "@/constants";
import { ETH_BLOCK_EXPLORER_URL } from "@/const/envs";

interface DetailsContainerProps {
  children: React.ReactNode;
  willName: string;
  willType: WillType;
  description: string | React.ReactNode;
  active: boolean;
  textSignatures?: string;
  method: WillMethod;
  contractId: string;
  willId: string;
}

export const DetailsContainer = (props: DetailsContainerProps) => {
  const {
    children,
    willName,
    willType,
    description,
    active,
    method,
    contractId,
    willId,
    textSignatures,
  } = props;
  const navigate = useNavigate();

  const viewSmartContract = () => {
    if (contractId) {
      window.open(`${ETH_BLOCK_EXPLORER_URL}/tx/${contractId}`, "_blank");
    }
  };

  const goToEdit = () => {
    navigate(`${APP_ROUTES_PATHS.EDIT_WILL}/${willId}`);
  };

  const signToReceiveFund = () => {};

  return (
    <Flex vertical className="app-details-container" gap="32px">
      <AppButton type="normal" onClick={() => navigate(-1)}>
        <Flex gap="16px">
          <ArrowOutlinedIcon />
          <Text size="text-lg" className="font-semibold">
            Back
          </Text>
        </Flex>
      </AppButton>
      <Flex vertical gap="24px">
        <Flex vertical gap={4}>
          <Flex gap={8} align="center">
            <Text size="text-xl" className="font-bold neutral-1 capitalize">
              {willName} details
            </Text>
            <AppBadge
              count={
                <Text size="text-md" className="white capitalize">
                  {willType} will
                </Text>
              }
              color="primary"
              size="lg"
            />
          </Flex>
          <Text className="neutral-2">{description}</Text>
        </Flex>
        {children}
      </Flex>
      {
        method === "created" ? (
          <Flex align="center" className="details-container--footer" gap={20}>
            <AppButton
              type="primary"
              size="xl"
              icon={<EditOutlined />}
              onClick={goToEdit}
            >
              <Text size="text-lg" className="uppercase white font-bold">
                Edit will
              </Text>
            </AppButton>
            <AppButton
              size="xl"
              rightIcon={<RightOutlined />}
              onClick={viewSmartContract}
            >
              <Text size="text-lg" className="uppercase neutral-1 font-bold">
                View smart contract
              </Text>
            </AppButton>
          </Flex>
        ) : method === "inherited" ? ( // inherited
          <Flex vertical align="flex-end" gap={10}>
            <Text className="neutral-2">{textSignatures}</Text>
            <AppButton
              type="primary"
              size="xl"
              disabled={!active}
              onClick={signToReceiveFund}
            >
              <Text size="text-lg" className="uppercase font-bold">
                Sign to receive fund
              </Text>
            </AppButton>
          </Flex>
        ) : null // inherited and inactive
      }
    </Flex>
  );
};
