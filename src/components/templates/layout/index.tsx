import { Layout } from "antd";
import "./styles.scss";

const { Content } = Layout;

export const formatDate = "DD-MM-YYYY HH:mm:ss";

interface ILayoutProps {
  children?: React.ReactNode;
}

export enum ThemesMode {
  dark = "dark",
  light = "light",
}

const LayoutComponent: React.FC<ILayoutProps> = ({ children }) => {
  return (
    <div id="layout">
      <Layout className="container">
        <Layout className={`site-layout`}>
          <Content className="site-layout-background">aa{children}</Content>
        </Layout>
      </Layout>
    </div>
  );
};

export default LayoutComponent;
