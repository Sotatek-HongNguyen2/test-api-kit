import WillToast from "@/components/atoms/ToastMessage";
import {
  AssetCard,
  AssetDetailCard,
  BeneficiariesCard,
  NoteBeneficiariesCard,
  ProgressCard,
} from "@/components/organisms/details-card";
import { DetailsContainer } from "@/components/organisms/wrapper-container/DetailsContainer";
import { useDevices } from "@/hooks/useMediaQuery";
import { WillServices } from "@/services/will-service";
import { getWalletSlice, useAppSelector } from "@/store";
import { WillData, WillMethod } from "@/types";
import { Flex, Spin } from "antd";
import { debounce } from "lodash";
import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";

export function DetailsPage() {
  const [willDetail, setWillDetail] = useState<WillData | null>(null);
  const { address } = useAppSelector(getWalletSlice);
  const [isLoading, setIsLoading] = useState(false);
  const { isMobile } = useDevices();

  const willService = new WillServices();

  const method: WillMethod | null = useMemo(
    () =>
      !!willDetail
        ? willDetail?.ownerAddress === address
          ? "created"
          : "inherited"
        : null,
    [willDetail, address]
  );
  const { willId } = useParams<{ willId: string }>();
  if (!willId) return null;

  const getWillDetail = async () => {
    setIsLoading(true);
    try {
      const data = await willService.getWillDetail({ willId });
      setWillDetail(data);
    } catch (error: any) {
      WillToast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const debouncedGetWillDetail = debounce(getWillDetail, 500);

  useEffect(() => {
    debouncedGetWillDetail();
  }, []);

  if (!willDetail || !method) return null;
  const getPageDescription = () => {
    if (['inheritance', 'forwarding'].includes(willDetail?.type) && method === "inherited") {
      return !["process", "done"]?.includes(willDetail?.status) ? (
        <>
          This is {willDetail?.type === "inheritance" ? "an" : "a"} <span className="capitalize">{willDetail?.type}</span>{" "}
          will you are a beneficiary. When this will is activated, a
          minimum number of co-signatures will be required for you as a
          beneficiary to claim the fund in the multisig-wallet.
        </>
      ) : (
        <>
          This is {willDetail?.type === "inheritance" ? "an" : "a"} <span className="capitalize">{willDetail?.type}</span>{" "}
          will you are as a beneficiary. Sign in Multisig-Wallet to claim
          funds.
        </>
      );
    }
    return (
      <>
        This is {willDetail?.type === "inheritance" ? "an" : "a"} <span className="capitalize">{willDetail?.type}</span>{" "}
        will you created with a list of beneficiaries.
      </>
    );
  };

  if (isLoading)
    return (
      <Flex
        justify="center"
        align="center"
        style={{
          width: "100vw",
          minHeight: "70vh",
        }}
      >
        <Spin size="large" />
      </Flex>
    );

  return (
    <DetailsContainer
      willName={willDetail?.name}
      willType={willDetail?.type}
      description={getPageDescription()}
      active={!["process", "done"]?.includes(willDetail?.status) ? false : true}
      textSignatures={`There are ${willDetail?.willSignature?.length || 0} of ${willDetail?.minSignature
        } needed signatures to receive fund`}
      method={method}
      contractId={willDetail?.txHash}
      willId={willId}
    >
      <Flex vertical gap={isMobile ? 20 : 24}>
        <AssetCard willDetail={willDetail} />
        {willDetail?.type !== "destruction" && (
          <BeneficiariesCard
            beneficiaries={willDetail?.willDetail}
            minSignature={willDetail?.minSignature}
          />
        )}
        {willDetail?.type === "forwarding" && (
          <AssetDetailCard
            beneficiaries={willDetail?.willDetail}
            ownerBalance={willDetail?.ownerBalance}
          />
        )}
        <ProgressCard
          activeDate={willDetail?.expTime}
          createdDate={willDetail?.createdAt}
          minimumSignatures={willDetail?.minSignature}
          method={method}
          lackSignMessage={willDetail?.lackSignMessage}
          lackTransaction={willDetail?.lackTransaction}
          owner={willDetail?.owner}
        />
        {willDetail?.type !== "destruction" && (
          <NoteBeneficiariesCard note={willDetail?.note} />
        )}
      </Flex>
    </DetailsContainer>
  );
}
