import type { questionComponentProps } from "../components/QuestionComponents/index.interface";

/**
 * 计算当前选中的selectedId 
 */
export function getNextSelectedId(componentId: string, componentList: Array<questionComponentProps>) {
    const visibleComponentList = componentList.filter((x: any) => !x.isHidden);
    const index = visibleComponentList.findIndex(item => item.componentId === componentId);
    if (index < 0) return "";
    // 重新计算 selectedId
    let newSelectedId = "";
    const length = visibleComponentList.length;
    if (length <= 1) {
        // 组件只有一个,删除之后就没有内容了
        newSelectedId = "";
    } else {
        if (index + 1 == length) {
            // 要删除最后一个,选中上一个组件
            newSelectedId = visibleComponentList[index - 1].componentId!;
        } else {
            // 要删除的不是最后一个,删除以后选中下一个
            newSelectedId = visibleComponentList[index + 1].componentId!;
        };
    }
    return newSelectedId;
}