import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { questionComponentProps } from "../../components/QuestionComponents/index.interface";
import { getNextSelectedId } from "../../utils/getNextSelectedId";
import { InsertNewComponent } from "../../utils/InsertNewComponent";
import { arrayMove } from "@dnd-kit/sortable";
// 导入 nanoid  
import { customAlphabet } from "nanoid";
const numbers = '0123456789';
const nanoid = customAlphabet(numbers, 8);
export type ComponentInfoType = {
    componentId?: string;
    componentType?: string;
    componentProps?: questionComponentProps;
    componentTitle?: string;
    isHidden?: boolean;
    isLock?: boolean;
    componentList?: any;
    selectedId?: any;
    copiedComponent?: any;
};

export type ComponentsStateType = {
    componentList: Array<questionComponentProps>;
    selectedId: string;
    copiedComponent: ComponentInfoType | null;
};
const INIF_STATE: ComponentsStateType = {
    componentList: [],
    selectedId: "",
    copiedComponent: null
};
export const componentSlice = createSlice({
    name: "components",
    initialState: INIF_STATE,
    reducers: {
        /**
         * 重置所有列表 
         */
        resetComponents: (state: ComponentsStateType, actions: PayloadAction<ComponentsStateType>) => {
            return {
                ...state,
                componentList: actions.payload as any
            };
        },
        /**
         * 修改selectId 
         */
        changeSelectId: (state: ComponentsStateType, actions: PayloadAction<string>) => {
            state.selectedId = actions.payload;
        },
        /**
         * 添加新组件 
         */
        addComponent: (state: ComponentsStateType, actions: PayloadAction<any>) => {
            const newComponent = actions.payload;
            InsertNewComponent(state, newComponent);
        },
        /**
         * 修改组件属性 
         */
        changeComponentProps: (state: ComponentsStateType, actions: PayloadAction<{ componentId: string, newProps: questionComponentProps; }>) => {
            // 获取当前选中的ID与组件
            const { componentId, newProps } = actions.payload;
            // 找到当前要修改的组件
            const curComp: any = state.componentList.find((item: any) => item.componentId === componentId);
            if (curComp) {
                curComp.componentProps = {
                    ...curComp.componentProps,
                    ...newProps
                };
            }
        },
        /**
         * 删除选中的组件 
         */
        removeComponent: (state: ComponentsStateType) => {
            const { componentList, selectedId } = state;
            // 重新计算selectedId
            const newSelectedId = getNextSelectedId(selectedId, componentList);
            state.selectedId = newSelectedId;
            // 找到当前要删除的组件
            const index = componentList.findIndex((item: any) => item.componentId === selectedId);
            componentList.splice(index, 1);
        },
        /**
         * 切换组件隐藏/显示 
         */
        changeComponentHidden: (state: ComponentsStateType, actions: PayloadAction<{ componentId: string, isHidden: boolean; }>) => {
            // 获取当前选中的组件
            const { componentList } = state;
            // 获取当前选中组件的ID与隐藏状态
            const { componentId, isHidden } = actions.payload;
            // 重新计算selectId
            let newSelectedId = "";
            if (isHidden) {
                newSelectedId = getNextSelectedId(componentId, componentList);
            } else {
                newSelectedId = componentId;
            }
            state.selectedId = newSelectedId;
            // 找到当前要修改的组件
            const curComp: any = componentList.find((item: any) => item.componentId === componentId);
            if (curComp) {
                curComp.isHidden = isHidden;
            }
        },
        /**
         * 切换组件锁定状态 
         */
        changeComponentLock: (state: ComponentsStateType, actions: PayloadAction<{ componentId: string; }>) => {
            // 获取当前选中的组件
            const { componentList } = state;
            // 获取当前选中组件的ID
            const { componentId } = actions.payload;
            // 找到当前要修改的组件
            const curComp: any = componentList.find((item: any) => item.componentId === componentId);
            if (curComp) {
                curComp.isLock = !curComp.isLock;
            }
        },
        /**
         * 拷贝当前选中的组件  
         */
        copySelectComponent: (state: ComponentsStateType) => {
            // 获取当前选中的组件/组件ID
            const { selectedId, componentList } = state;
            const selectComponent = componentList.find((item: any) => item.componentId === selectedId);
            if (!selectComponent) return; // 没有选中组件
            // 拷贝组件
            state.copiedComponent = JSON.parse(JSON.stringify(selectComponent));
        },
        /**
         * 粘贴当前选中的组件 
         */
        pasteSelectComponent: (state: ComponentsStateType) => {
            // 获取当前选中的组件/组件ID
            const { copiedComponent } = state;
            if (!copiedComponent) return; // 没有拷贝组件
            // 粘贴新的组件(修改当前粘贴的组件ID)
            copiedComponent.componentId = nanoid(16);
            InsertNewComponent(state, copiedComponent);
        },
        /**
         * 选中上一个组件 
         */
        selectPrevComponent: (state: ComponentsStateType) => {
            // 获取当前选中的组件/组件ID
            const { selectedId, componentList = [] } = state;
            // 获取当前选中组件的索引
            const index = componentList.findIndex((item: any) => item.componentId === selectedId);
            if (index < 0) return; // 未选中组件
            if (index <= 0) return;// 已经选中第一个无法再选上一个
            if (componentList.length) {
                state.selectedId = componentList[index - 1].componentId as string || "";
            }
        },
        /**
         * 选中下一个组件 
         */
        selectNextComponent: (state: ComponentsStateType) => {
            // 获取当前选中的组件/组件ID
            const { selectedId, componentList = [] } = state;
            // 获取当前选中组件的索引
            const index = componentList.findIndex((item: any) => item.componentId === selectedId);
            if (index < 0) return; // 未选中组件
            if (index + 1 === componentList.length) return;// 已经选中最后一个无法再选下一个
            if (componentList.length) {
                state.selectedId = componentList[index + 1].componentId as string || "";
            }
        },
        /**
         * 修改组件标题 
         */
        changeComponentTitle: (state: ComponentsStateType, actions: PayloadAction<{ componentId: string; componentTitle: string; }>) => {
            // 解构参数
            const { componentId, componentTitle } = actions.payload;
            // 获取当前选中的组件
            const curComp = state.componentList.find((item: any) => item.componentId == componentId);
            // 修改标题
            if (curComp) curComp.componentTitle = componentTitle;
        },
        /**
         *  移动组件位置
         */
        moveComponent: (state: ComponentsStateType, actions: PayloadAction<{ oldIndex: number; newIndex: number; }>) => {
            // 解构参数
            const { componentList } = state;
            const { oldIndex, newIndex } = actions.payload;
            // 移动组件位置
            state.componentList = arrayMove(componentList, oldIndex, newIndex);
        }
    }
});

export const { resetComponents, changeSelectId, addComponent, changeComponentProps, removeComponent, changeComponentHidden, changeComponentLock, copySelectComponent, pasteSelectComponent, selectPrevComponent, selectNextComponent, changeComponentTitle, moveComponent } = componentSlice.actions;
export default componentSlice.reducer;