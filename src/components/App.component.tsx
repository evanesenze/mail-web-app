import { Layout } from "antd";
import React, { lazy, Suspense } from "react";
import { useAppSelector } from "hooks/useApp";
import SiderComponent from "./Sider.component";
import SearchComponent from "./Search.component";
import LoadingComponent from "./Loading.component";

const MailsTable = lazy(() => import("./MailsTable.component"));
const MailCard = lazy(() => import("./MailCard.component"));

const { Content } = Layout;

const App: React.FC = () => {
  const currentMail = useAppSelector((store) => store.client.currentMail);

  return (
    <Layout hasSider style={{ height: "100%" }}>
      <SiderComponent />
      <Layout>
        <SearchComponent />
        <Content className="content_container">
          <Suspense fallback={<LoadingComponent />}>
            {currentMail ? <MailCard /> : <MailsTable />}
          </Suspense>
        </Content>
      </Layout>
    </Layout>
  );
};

export default App;
