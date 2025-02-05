import type { ComponentsStateType, ComponentInfoType } from "../pages/store/components";

/**
 * 导出插入/粘贴新组件功能函数 
 */
export function InsertNewComponent(state: ComponentsStateType, newComponent: ComponentInfoType) {
    // 获取当前选中的ID
    const { selectedId } = state;
    // 获取当前选中的索引
    const index = state.componentList.findIndex((item: any) => item.componentId === selectedId);
    // 未选中任何组件
    if (index < 0) {
        state.componentList.push(newComponent);
    } else {
        // 选中了某个组件
        state.componentList.splice(index + 1, 0, newComponent);
    }
    // 更新选中的ID
    state.selectedId = newComponent.componentId as string;
}