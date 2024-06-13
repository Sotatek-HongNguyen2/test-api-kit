import "./styles.scss";
import { AppButton } from "@/components/atoms/button";
import { Dashboard } from "@/components/molecules/dashboard";
import { WillTabs } from "@/components/organisms/wil-tabs";
import { WrapperContainer } from "@/components/organisms/wrapper-container";
import { useLogout } from "@/hooks/useAuth";
import { Flex } from "antd";

export function HomePage() {
  const { logout, isLoading, error } = useLogout();
  const handleClickLogout = async () => {
    await logout();
  };
  return (
    <Flex vertical gap="5vh" className="home-page">
      <WillTabs />
      <AppButton type="primary" onClick={handleClickLogout}>
        Logout
      </AppButton>
    </Flex>
  );
}
