import WillToast from "@/components/atoms/ToastMessage";
import { AssetCard, AssetDetailCard, BeneficiariesCard, NoteBeneficiariesCard, ProgressCard } from "@/components/organisms/details-card";
import { DetailsContainer } from "@/components/organisms/wrapper-container/DetailsContainer";
import { WillServices } from "@/services/will-service";
import { getWalletSlice, useAppSelector } from "@/store";
import { WillData, WillMethod } from "@/types";
import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";

export function DetailsPage() {
  const { willId } = useParams<{ willId: string }>();
  if (!willId) return null;

  const { address } = useAppSelector(getWalletSlice);
  const [willDetail, setWillDetail] = useState<WillData | null>(null);
  const willService = new WillServices();

  const method: WillMethod | null = useMemo(() => !!willDetail ? willDetail?.ownerAddress === address ? "created" : "inherited" : null, [willDetail, address])

  const getWillDetail = async () => {
    try {
      const data = await willService.getWillDetail({ willId });
      setWillDetail(data);
    } catch (error: any) {
      WillToast.error(error.message)
    }
  }

  useEffect(() => {
    getWillDetail();
  }, [])


  if (!willDetail || !method) return null;

  return (
    <DetailsContainer
      willName={willDetail?.name}
      willType={willDetail?.type}
      description={method === "inherited"
        ? `This is a ${willDetail?.type} will you are as a beneficiary.`
        : `This is a ${willDetail?.type} will you created with list of beneficiaries.`}
      active={willDetail?.status !== 'active' ? false : { textSignatures: `There are ${willDetail?.willSignature?.length || 0} of ${willDetail?.minSignature} needed signatures to receive fund` }}
      method={method}
      contractId={willDetail?.txHash}
      willId={willId}
    >
      <AssetCard willDetail={willDetail} />
      {
        willDetail?.type !== 'destruction' && (
          <BeneficiariesCard beneficiaries={willDetail?.willDetail} />
        )
      }
      {
        willDetail?.type === 'forwarding' && (
          <AssetDetailCard beneficiaries={willDetail?.willDetail} />
        )
      }
      <ProgressCard
        activeDate={willDetail?.expTime}
        createdDate={willDetail?.createdAt}
        minimumSignatures={willDetail?.minSignature}
        method={method}
        lackSignMessage={willDetail?.lackSignMessage}
        lackTransaction={willDetail?.lackTransaction}
        owner={willDetail?.owner}
      />
      {
        willDetail?.type !== 'destruction' && (
          <NoteBeneficiariesCard note={willDetail?.note} />
        )
      }
    </DetailsContainer>
  );
}
