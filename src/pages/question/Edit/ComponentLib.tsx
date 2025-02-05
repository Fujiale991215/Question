import { FC } from "react";
import { componentConfiGroup, ComponentConfType } from "../../../components/QuestionComponents/index.interface";
import { Typography } from "antd";
import { useDispatch } from "react-redux";
import { addComponent } from "../../store/components";
import "../scss/ComponentLib.scss";
// 导入 nanoid  
import { customAlphabet } from "nanoid";
const numbers = '0123456789';
const nanoid = customAlphabet(numbers, 8);
const { Title } = Typography;
// 获取组件
const getComponent = (item: ComponentConfType) => {
    const dispatch = useDispatch();
    const { Component, componentTitle, componentType, componentProps, componentId } = item;
    delete componentProps.onChange; // 删除组件的onChange事件
    // 点击事件
    const handleClick = () => {
        dispatch(addComponent({ componentId: nanoid(16), componentTitle, componentType, componentProps }));
    };

    return <div className="component-lib" key={`${item.componentTitle}${Math.random()}`} onClick={handleClick}>
        <div className="component-lib-container">
            <Component key={item.componentId} />
        </div>
    </div>;
};
const ComponentLib: FC = () => {
    return <>
        {
            componentConfiGroup.map((item, index) => {
                return <div key={item.groupName}>
                    <Title level={3} style={{ fontSize: "16px", marginTop: index > 0 ? "20px" : "0" }}>{item.groupName}</Title>
                    <div>
                        {item.components.map((item: any) => getComponent(item))}
                    </div>
                </div>;
            })
        }
    </>;
};

export default ComponentLib;