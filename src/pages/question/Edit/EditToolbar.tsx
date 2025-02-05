import { FC } from "react";
import { Space, Button, Tooltip } from "antd";
import { BlockOutlined, CopyOutlined, DeleteOutlined, DownOutlined, EyeInvisibleOutlined, LockOutlined, RedoOutlined, UndoOutlined, UpOutlined } from "@ant-design/icons";
import { removeComponent, changeComponentHidden, changeComponentLock, copySelectComponent, pasteSelectComponent, moveComponent } from "../../store/components";
import getComponentInfo from "../../../hooks/getComponentInfo";
import { ActionCreators as UndoActionCreators } from "redux-undo";
import { useDispatch } from "react-redux";
const EditToolbar: FC = () => {
    // 获取当前选中的ID与组件
    const { selectedId, selectedComponent, copiedComponent, visibleComponentList } = getComponentInfo();
    // 获取当前所有画布组件的长度
    const length = visibleComponentList.length;
    // 获取当前选中的组件的锁定状态
    const { isLock } = selectedComponent || {};
    // 获取当前选中组件的索引
    const selectedIndex = visibleComponentList.findIndex((item: any) => item.componentId === selectedId);
    // 判断是否第一个组件
    const isFirst = selectedIndex <= 0;
    // 判断是否最后一个组件
    const isLast = selectedIndex >= length - 1;
    // 派发请求
    const dispatch = useDispatch();
    // 删除组件
    const deleteComponent = () => {
        dispatch(removeComponent());
    };
    // 隐藏组件
    const hideComponent = () => {
        dispatch(changeComponentHidden({ componentId: selectedId, isHidden: true }));
    };
    // 锁定组件
    const LockComponent = () => {
        dispatch(changeComponentLock({ componentId: selectedId }));
    };
    // 复制组件
    const copyComponent = () => {
        dispatch(copySelectComponent());
    };
    // 粘贴组件
    const pasteComponent = () => {
        dispatch(pasteSelectComponent());
    };
    // 上移组件
    const upComponent = () => {
        if (isFirst) return;
        dispatch(moveComponent({ oldIndex: selectedIndex, newIndex: selectedIndex - 1 }));
    };
    // 下移组件
    const downComponet = () => {
        if (isLast) return;
        dispatch(moveComponent({ oldIndex: selectedIndex, newIndex: selectedIndex + 1 }));
    };
    // 撤销
    const undoComponent = () => {
        dispatch(UndoActionCreators.undo());
    };
    // 重做
    const redoComponent = () => {
        dispatch(UndoActionCreators.redo());
    };
    return <Space>
        <Tooltip title="删除">
            <Button shape="circle" icon={<DeleteOutlined />} onClick={deleteComponent}></Button>
        </Tooltip>
        <Tooltip title="隐藏">
            <Button shape="circle" icon={<EyeInvisibleOutlined />} onClick={hideComponent}></Button>
        </Tooltip>
        <Tooltip title="锁定">
            <Button shape="circle" icon={<LockOutlined />} onClick={LockComponent} type={isLock ? "primary" : "default"}></Button>
        </Tooltip>
        <Tooltip title="复制">
            <Button shape="circle" icon={<CopyOutlined />} onClick={copyComponent}></Button>
        </Tooltip>
        <Tooltip title="粘贴">
            <Button shape="circle" icon={<BlockOutlined />} onClick={pasteComponent} disabled={!copiedComponent}></Button>
        </Tooltip>
        <Tooltip title="上移">
            <Button shape="circle" icon={<UpOutlined />} onClick={upComponent} disabled={isFirst}></Button>
        </Tooltip>
        <Tooltip title="下移">
            <Button shape="circle" icon={<DownOutlined />} onClick={downComponet} disabled={isLast}></Button>
        </Tooltip>
        <Tooltip title="撤销">
            <Button shape="circle" icon={<UndoOutlined />} onClick={undoComponent}></Button>
        </Tooltip>
        <Tooltip title="重做">
            <Button shape="circle" icon={<RedoOutlined />} onClick={redoComponent}></Button>
        </Tooltip>
    </Space>;
};

export default EditToolbar;