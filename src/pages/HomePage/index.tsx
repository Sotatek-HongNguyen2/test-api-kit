import { WillTabs } from "@/components/organisms/wil-tabs";
import { WrapperContainer } from "@/components/organisms/wrapper-container";

export function HomePage() {
  return (
    <WrapperContainer title="Dashboard">
      <WillTabs />
    </WrapperContainer>
  );
}
