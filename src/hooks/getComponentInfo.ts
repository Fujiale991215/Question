import { useSelector } from "react-redux";
import { storeType } from "../store";
import type { ComponentInfoType } from "../pages/store/components";
/**
 * 获取组件渲染所需要的数据 
 */
function getComponentInfo() {
    // 获取组件列表
    const components = useSelector((state: storeType) => state.components.present as ComponentInfoType);
    let { componentList = [], selectedId, copiedComponent = [] } = components;
    const visibleComponentList = componentList.filter((item: any) => !item.isHidden);
    if (visibleComponentList.length) {
        selectedId ? selectedId = selectedId : selectedId = visibleComponentList[0].componentId;
    } else {
        selectedId = "";
    }
    // 获取当前选中的组件
    const selectedComponent = visibleComponentList.find((item: any) => item.componentId === selectedId);
    return {
        componentList,
        visibleComponentList,
        selectedId,
        selectedComponent,
        copiedComponent
    };
}

export default getComponentInfo;