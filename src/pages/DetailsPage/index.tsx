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
  const getPageDescription = () => {
    if (method === "inherited") {
      switch (willDetail?.type) {
        case "inheritance":
          return ["process", "done"]?.includes(willDetail?.status) ? (
            <>
              This is an <span className="capitalize">{willDetail?.type}</span> will you are a beneficiary of. When this will is activated, a minimum number of co-signatures will be required for you as a beneficiary to claim the fund in the multisig-wallet.
            </>
          ) : (
            <>
              This is an <span className="capitalize">{willDetail?.type}</span> will you are as a beneficiary.
            </>
          );
        default:
          return (
            <>
              This is an <span className="capitalize">{willDetail?.type}</span> will you are as a beneficiary.
            </>
          );
      }
    }
    switch (willDetail?.type) {
      case "destruction":
        return (
          <>
            This is a <span className="capitalize">{willDetail?.type}</span> will you created with a list of assets.
          </>
        );
      default:
        return (
          <>
            This is a <span className="capitalize">{willDetail?.type}</span> will you created with a list of beneficiaries.
          </>
        );
    }
  };

  return (
    <DetailsContainer
      willName={willDetail?.name}
      willType={willDetail?.type}
      description={getPageDescription()}
      active={!["process", "done"]?.includes(willDetail?.status) ? false : true}
      textSignatures={`There are ${willDetail?.willSignature?.length || 0} of ${willDetail?.minSignature} needed signatures to receive fund`}
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
          <AssetDetailCard
            beneficiaries={willDetail?.willDetail}
            ownerBalance={willDetail?.ownerBalance}
          />
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
