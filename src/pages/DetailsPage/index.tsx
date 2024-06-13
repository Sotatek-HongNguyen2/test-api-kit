import { AssetCard, BeneficiariesCard, NoteBeneficiariesCard, ProgressCard } from "@/components/organisms/details-card";
import { willsData } from "@/components/organisms/wil-tabs";
import { DetailsContainer } from "@/components/organisms/wrapper-container/DetailsContainer";

export function DetailsPage() {

  const willDetail = willsData[0];

  return (
    <DetailsContainer
      willName={willDetail?.willName}
      willType={willDetail?.willType}
      description={`This is a ${willDetail?.willType} will you are as a beneficiary.`}
      active={false}
    >
      <AssetCard assets={willDetail?.assets} />
      <BeneficiariesCard beneficiaries={willDetail?.beneficiaries} />
      <ProgressCard activeDate={willDetail?.activeDate} createdDate={willDetail?.createdDate} minimumSignatures={willDetail?.minimumSignatures} />
      <NoteBeneficiariesCard note={willDetail?.noteToBeneficiaries} />
    </DetailsContainer>
  );
}
