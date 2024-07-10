import { Flex } from "antd";

import "./styles.scss";
import { EditOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

import { AppButton, IconButton } from "@/components/atoms/button";
import { ArrowOutlinedIcon, RightIcon } from "@/assets/icons/custom-icon";
import { Text } from "@/components/atoms/text";
import { AppBadge } from "@/components/atoms/badge";
import { WillMethod, WillType } from "@/types";
import { APP_ROUTES_PATHS } from "@/constants";
import { ETH_BLOCK_EXPLORER_URL } from "@/const/envs";
import { useDevices } from "@/hooks/useMediaQuery";

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
  const { isTablet } = useDevices();


  const viewSmartContract = () => {
    if (contractId) {
      window.open(`${ETH_BLOCK_EXPLORER_URL}/tx/${contractId}`, "_blank");
    }
  };

  const goToEdit = () => {
    navigate(`${APP_ROUTES_PATHS.EDIT_WILL}/${willId}`);
  };

  const signToReceiveFund = () => { };

  return (
    <Flex vertical className="app-details-container" gap="32px">
      {
        !isTablet ? (

          <AppButton type="normal" onClick={() => navigate(-1)}>
            <Flex gap="16px">
              <ArrowOutlinedIcon />
              <Text size="text-lg" className="font-semibold">
                Back
              </Text>
            </Flex>
          </AppButton>
        ) : null
      }
      <Flex vertical gap="24px">
        <Flex gap={10}>
          {
            isTablet ? (
              <IconButton className="back-mobile" onClick={() => navigate(-1)}>
                <ArrowOutlinedIcon />
              </IconButton>
            ) : null
          }
          <Flex vertical gap={4}>
            <Flex vertical={isTablet ? true : false} gap={8} align={isTablet ? "flex-start" : "center"}>
              <Text size="text-xl" className="font-bold neutral-1 capitalize">
                {
                  (isTablet && willName?.length > 10)
                    ? willName?.substring(0, 10) + "... "
                    : willName
                } Details
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
              {
                method === "inherited" ? (

                  <AppBadge
                    count={
                      <Text size="text-md" className="white capitalize">
                        {active ? "Activated" : "Inactivated"}
                      </Text>
                    }
                    color={active ? "secondary" : "error"}
                    size="lg"
                  />
                ) : null
              }
            </Flex>
            <Text className="neutral-2 text-description">{description}</Text>
          </Flex>
        </Flex>

        {
          method === "inherited" ? ( // inherited
            <Flex vertical align="flex-start" gap={10}>
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
          ) : null
        }
        {children}
        {
          method === "created" ? (
            <Flex
              vertical={isTablet ? true : false}
              className="details-container--footer"
              gap={isTablet ? 12 : 20}
              {
              ...(!isTablet && {
                align: "center",
              })
              }
            >
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
                icon={<RightIcon />}
                iconPosition="end"
                onClick={viewSmartContract}
              >
                <Text size="text-lg" className="uppercase neutral-1 font-bold">
                  View smart contract
                </Text>
              </AppButton>
            </Flex>
          ) : null
        }
      </Flex>
    </Flex>
  );
};
