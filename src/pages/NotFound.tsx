import React, { FC } from "react";
import { Button, Result } from "antd";
import { useNavigate } from "react-router-dom";
const NotFound: FC = () => {
  const nav = useNavigate();
  return (
    <Result status={"404"} title="Not Found" subTitle="对不起,您访问的页面不存在">
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Button type="primary" onClick={() => nav("/")}>
          返回首页
        </Button>
      </div>
    </Result>
  );
};

export default NotFound;
