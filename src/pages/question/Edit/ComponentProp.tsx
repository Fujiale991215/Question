import { FC } from "react";
import getComponentInfo from "../../../hooks/getComponentInfo";
import { getComponentConfByType, questionComponentProps } from "../../../components/QuestionComponents/index.interface";
import { useDispatch } from "react-redux";
import { changeComponentProps } from "../../store/components";
// 定义未选中组件时返回的组件
const handleBackEmpty = (value: any) => {
    if (!value) {
        return <div style={{ textAlign: "center" }}>未选中组件</div>;
    } else {
        return null;
    }
};
const ComponentProp: FC = () => {
    // 派发请求
    const dispatch = useDispatch();
    // 获取组件信息
    const { selectedComponent } = getComponentInfo();
    // 组件为空时返回
    if (!selectedComponent) {
        return handleBackEmpty(selectedComponent);
    }
    // 解构组件类型和属性
    const { componentType, componentProps, isLock, isHidden } = selectedComponent;
    // 获取组件配置
    const componentConf = getComponentConfByType(componentType);
    // 组件配置为空时返回
    if (!componentConf) {
        return handleBackEmpty(componentConf);
    }
    // 解构属性表单
    const { PropComponent } = componentConf;
    // 表单组件状态发生变化的函数
    const changeProps = (newProps: questionComponentProps) => {
        if (!selectedComponent) return;
        const { componentId } = selectedComponent;
        dispatch(changeComponentProps({ componentId, newProps }));
    };
    // 返回表单组件
    return <PropComponent {...componentProps} onChange={changeProps} disabled={isLock || isHidden} />;
};

export default ComponentProp;