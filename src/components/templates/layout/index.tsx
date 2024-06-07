import { Flex, Layout } from "antd";
import "./styles.scss";
import { Outlet } from "react-router-dom";
import { Header } from "@/components/organisms";

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
  return (
    <div id="app-layout">
      <Layout className="container">
        <Layout className={`site-layout`}>
          <Content className="site-layout-background">
            <Flex vertical>
              <Header />
              <div className="app-page">
                <Outlet />
              </div>
            </Flex>
          </Content>
        </Layout>
      </Layout>
    </div>
  );
};

export default LayoutComponent;
