import { FC, forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import { Tabs } from "antd";
import { FileTextOutlined, SettingOutlined } from "@ant-design/icons";
import ComponentProp from "./ComponentProp";
import PageSetting from "./pageSetting";
import getComponentInfo from "../../../hooks/getComponentInfo";
import TAB_KEYS from "../model/TabKeysEnum";
const RightPanel: FC<any> = forwardRef((props, ref) => {
    // 动态组件
    const [activeKey, setActivekey] = useState(TAB_KEYS.PROP_KEY);
    // 获取当前选中组件
    const { selectedId } = getComponentInfo();
    // 获取图层组件Ref
    const pageRef = useRef(null);
    useEffect(() => {
        if (selectedId) {
            setActivekey(TAB_KEYS.PROP_KEY);
        } else {
            setActivekey(TAB_KEYS.SETTING_KEY);
        }
    }, [selectedId]);
    function handleChange(val: any) {
        setActivekey(val);
    }
    useImperativeHandle(ref, () => ({
        pageRef, handleChange
    }));
    // 组件列表
    const tabsItems: any[] = [
        {
            key: TAB_KEYS.PROP_KEY,
            label: (
                <span>
                    <FileTextOutlined />
                    属性
                </span>
            ),
            children: <ComponentProp />
        },
        {
            key: TAB_KEYS.SETTING_KEY,
            label: (
                <span>
                    <SettingOutlined />
                    图层
                </span>
            ),
            children: <PageSetting ref={pageRef} />
        }
    ];
    return <Tabs activeKey={activeKey} items={tabsItems} onChange={handleChange} />;
});

export default RightPanel;