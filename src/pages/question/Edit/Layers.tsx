import React, { FC, useState, ChangeEvent } from 'react';
import { message, Input, Button, Space } from 'antd';
import { EyeInvisibleOutlined, LockOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import getComponentInfo from "../../../hooks/getComponentInfo";
import { changeSelectId, changeComponentTitle, changeComponentLock, changeComponentHidden, moveComponent } from '../../store/components';
import SortableContainer from '../../../common/components/SortableContainer';
import SortableItem from '../../../common/components/SortableItem';
import "../scss/Layers.scss";
const Layers: FC = () => {
    // 派发请求
    const dispatch = useDispatch();
    // 记录当前正在修改标题的组件
    const [changingTitleId, setChangingTitleId] = useState("");
    // 获取redux组件列表
    const { visibleComponentList, selectedId } = getComponentInfo();
    // 点击选中组件
    const handleTitleClick = (componentId: string) => {
        const curComp = visibleComponentList.find((item: any) => item.componentId === componentId); // 获取当前点击的组件
        if (curComp && curComp.isHidden) {
            message.info("不能选中隐藏的组件");
            return;
        }
        if (componentId != selectedId) {
            dispatch(changeSelectId(componentId));
            setChangingTitleId("");
            return;
        }
        // 点击修改标题
        setChangingTitleId(componentId);
    };
    // 修改标题
    const handleChangeTitle = (event: ChangeEvent<HTMLInputElement>) => {
        // 获取新标题
        const newTitle = event.target.value.trim();
        if (!newTitle) return;
        if (!selectedId) return;
        dispatch(changeComponentTitle({ componentId: selectedId, componentTitle: newTitle }));
    };
    // 切换显示隐藏
    const handleToggleVisible = (componentId: string, isHidden: boolean) => {
        dispatch(changeComponentHidden({ componentId, isHidden }));
    };
    // 切换锁定
    const handleToggleLock = (componentId: string) => {
        dispatch(changeComponentLock({ componentId }));
    };
    // SortableContainer 组件的items 属性,需要每个item都有id
    const componentListWithId = visibleComponentList.map((item: any) => {
        return { ...item, id: item.componentId };
    });
    // 拖拽排序结束
    const handleDragEnd = (oldIndex: number, newIndex: number) => {
        dispatch(moveComponent({ oldIndex, newIndex }));
    };
    return (<SortableContainer items={componentListWithId} onDragEnd={handleDragEnd}>
        {visibleComponentList.map((item: any) => {
            const { componentId, componentTitle, isHidden, isLock } = item;
            return (
                <SortableItem key={componentId} id={componentId}>
                    <div className='layers-wrapper'>
                        <div className={`layers-title ${componentId == selectedId ? 'layers-selected' : ''} `} onClick={() => handleTitleClick(componentId)}>
                            {componentId == changingTitleId ? <Input value={componentTitle} onPressEnter={() => setChangingTitleId("")} onBlur={() => setChangingTitleId("")} onChange={handleChangeTitle} /> : componentTitle}
                        </div>
                        <div className="layers-handler">
                            <Space>
                                <Button
                                    size="small"
                                    shape="circle"
                                    className={!isHidden ? "layers-btn" : ''}
                                    icon={<EyeInvisibleOutlined />}
                                    type={isHidden ? 'primary' : 'text'}
                                    onClick={() => handleToggleVisible(componentId, !isHidden)}
                                />
                                <Button
                                    size="small"
                                    shape="circle"
                                    className={!isLock ? "layers-btn" : ''}
                                    icon={<LockOutlined />}
                                    type={isLock ? 'primary' : 'text'}
                                    onClick={() => handleToggleLock(componentId)}
                                />
                            </Space>
                        </div>
                    </div>
                </SortableItem>
            );
        })}
    </SortableContainer>
    );
};

export default Layers;