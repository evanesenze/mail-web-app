import { LoadingOutlined } from "@ant-design/icons";
import { Row } from "antd";
import React from "react";

const LoadingComponent: React.FC = () => {
  return (
    <Row justify="center" align="middle" style={{ height: "100%" }}>
      <LoadingOutlined className="loading_component" />
    </Row>
  );
};

export default LoadingComponent;
