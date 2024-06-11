import { WillToast } from "@/components/atoms/Toast";
import { AppButton } from "@/components/atoms/button";
import { WillTabs } from "@/components/organisms/wil-tabs";
import { WrapperContainer } from "@/components/organisms/wrapper-container";
import { useLogout } from "@/hooks/useAuth";

export function HomePage() {
  const { logout, isLoading, error } = useLogout();
  const handleClickLogout = async () => {
    await logout();
  };
  return (
    <WrapperContainer title="Dashboard">
      <WillTabs />
      <AppButton type="primary" onClick={handleClickLogout}>
        Logout
      </AppButton>
    </WrapperContainer>
  );
}
