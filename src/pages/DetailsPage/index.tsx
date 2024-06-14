import { AssetCard, AssetDetailCard, BeneficiariesCard, NoteBeneficiariesCard, ProgressCard } from "@/components/organisms/details-card";
import { willsData } from "@/components/organisms/wil-tabs";
import { DetailsContainer } from "@/components/organisms/wrapper-container/DetailsContainer";
import { useParams } from "react-router-dom";

export function DetailsPage() {
  const { willId } = useParams<{ willId: string }>();
  const willDetail = willsData.find((will) => will.willId === Number(willId));

  if (!willDetail) return null;

  return (
    <DetailsContainer
      willName={willDetail?.willName}
      willType={willDetail?.willType}
      description={`This is a ${willDetail?.willType} will you are as a beneficiary.`}
      active={willDetail?.active === false ? false : { textSignatures: `There are ${willDetail?.minimumSignatures} of ${willDetail?.totalSignatures} needed signatures to receive fund` }}
      method={willDetail?.method}
    >
      <AssetCard assets={willDetail?.assets} />
      <BeneficiariesCard beneficiaries={willDetail?.beneficiaries} />
      {
        willDetail?.willType === 'forwarding' && (
          <AssetDetailCard beneficiaries={willDetail?.beneficiaries} />
        )
      }
      <ProgressCard
        activeDate={willDetail?.activeDate}
        createdDate={willDetail?.createdDate}
        minimumSignatures={willDetail?.minimumSignatures}
        method={willDetail?.method}
      />
      <NoteBeneficiariesCard note={willDetail?.noteToBeneficiaries} />
    </DetailsContainer>
  );
}
