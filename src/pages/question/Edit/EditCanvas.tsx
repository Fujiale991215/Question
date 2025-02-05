
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Spin } from "antd";
import getComponentInfo from "../../../hooks/getComponentInfo";
import { getComponentConfByType } from "../../../components/QuestionComponents/index.interface";
import { changeSelectId, moveComponent } from "../../store/components";
import useKeydown from "../../../hooks/useKeyPress";
import SortableContainer from '../../../common/components/SortableContainer';
import SortableItem from '../../../common/components/SortableItem';
import "../scss/EditCanvas.scss";
// 获取组件函数  
const getComponent = (item: any) => {
    const { componentType, componentProps } = item;
    const componentConf = getComponentConfByType(componentType);
    if (!componentConf) return null;
    const { Component } = componentConf;
    return <Component {...componentProps} key={item.componentId} />;
};
const EditCanvas = ({ loading }: any) => {
    // 绑定快捷键
    useKeydown();
    // 派发请求  
    const dispatch = useDispatch();
    // 获取组件列表数据  
    const { visibleComponentList, selectedId } = getComponentInfo();
    useEffect(() => {
        dispatch(changeSelectId(selectedId));
        return () => {
            dispatch(changeSelectId(''));
        };
    }, []);
    // 处理点击事件  
    const handleClick = (e: React.MouseEvent<HTMLDivElement>, id: string) => {
        e.stopPropagation();
        dispatch(changeSelectId(id));
    };
    // SortableContainer 组件的items 属性,需要每个item都有id
    const componentListWithId = visibleComponentList.map((item: any) => {
        return { ...item, id: item.componentId };
    });
    // 拖拽结束后的回调
    const handleDragEnd = (oldIndex: number, newIndex: number) => {
        dispatch(moveComponent({ oldIndex, newIndex }));
    };
    // 在所有情况下调用 hooks  
    if (loading) {
        return (
            <div style={{ textAlign: "center", marginTop: "350px" }}>
                <Spin />
            </div>
        );
    }
    return (
        <SortableContainer items={componentListWithId} onDragEnd={handleDragEnd}>
            <div className="edit-canvas">
                {visibleComponentList.map((item: any) => {
                    return (
                        <SortableItem key={item.componentId} id={item.componentId}>
                            <div
                                className={`edit-canvas-content ${selectedId === item.componentId ? "edit-canvas-selected" : ""} ${item.isLock ? "edit-canvas-lock" : ""}`}
                                onClick={(e) => handleClick(e, item.componentId)}
                            >
                                <div className="edit-canvas-component">
                                    {getComponent(item)}
                                </div>
                            </div>
                        </SortableItem>
                    );
                })}
            </div>
        </SortableContainer>
    );
};

export default EditCanvas;