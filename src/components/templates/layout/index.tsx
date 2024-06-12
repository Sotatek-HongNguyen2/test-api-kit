import { Flex, Layout } from "antd";
import "./styles.scss";
import { Outlet, useLocation } from "react-router-dom";
import { Header } from "@/components/organisms";
import { Dashboard } from "@/components/molecules/dashboard";

const { Content } = Layout;

export const formatDate = "DD-MM-YYYY HH:mm:ss";

interface ILayoutProps {
  children?: React.ReactNode;
}

export enum ThemesMode {
  dark = "dark",
  light = "light",
}

const LayoutComponent: React.FC<ILayoutProps> = () => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  return (
    <div id="app-layout">
      <Layout className="container">
        <Layout className={`site-layout`}>
          <Content className="site-layout-background">
            <Flex vertical>
              <Header />
              {
                isHomePage && (
                  <Dashboard title="My will list" />
                )
              }
              <Flex vertical className="app-page">
                <Outlet />
              </Flex>
            </Flex>
          </Content>
        </Layout>
      </Layout>
    </div>
  );
};

export default LayoutComponent;
