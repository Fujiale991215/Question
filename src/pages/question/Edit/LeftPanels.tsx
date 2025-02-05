import { FC } from "react";
import { Tabs } from "antd";
import { AppstoreOutlined, BarsOutlined } from "@ant-design/icons";
import ComponentLib from "./ComponentLib";
import Layers from "./Layers";
const LeftPanels: FC = () => {
    // 组件列表
    const tabsItems: any[] = [
        {
            key: "componentLib",
            label: (
                <span>
                    <AppstoreOutlined />
                    组件库
                </span>
            ),
            children: <ComponentLib />
        },
        {
            key: "componentList",
            label: (
                <span>
                    <BarsOutlined />
                    图层
                </span>
            ),
            children: <Layers />
        }
    ];
    return <Tabs defaultActiveKey="componentLib" items={tabsItems} />;
};

export default LeftPanels;