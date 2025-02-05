import { useKeyPress } from "ahooks";
import { useDispatch } from "react-redux";
import { removeComponent, copySelectComponent, pasteSelectComponent, selectPrevComponent, selectNextComponent } from "../pages/store/components";
import { ActionCreators as UndoActionCreators } from "redux-undo";
/**
 * 获取当前光标所在元素是否合法 
 */
function isActiveElementValid() {
    const activeElement = document.activeElement;
    // 增加Dnd-kit组件之后的操作逻辑
    if (activeElement === document.body) return true;
    if (activeElement?.matches('div[role="button"]')) return true;
    return false;
}

const useKeydown = () => {
    const dispatch = useDispatch();
    // 删除组件
    useKeyPress(['backspace', 'delete'], () => {
        if (!isActiveElementValid()) return; // 防止输入框删除
        dispatch(removeComponent());
    });
    // 复制组件
    useKeyPress(['ctrl.c', 'meta.c'], () => {
        if (!isActiveElementValid()) return; // 防止输入框删除
        dispatch(copySelectComponent()); // 复制组件
    });
    // 粘贴组件
    useKeyPress(['ctrl.v', 'meta.v'], () => {
        if (!isActiveElementValid()) return; // 防止输入框删除
        dispatch(pasteSelectComponent()); // 粘贴组件
    });
    // 选中上一个
    useKeyPress(['uparrow'], () => {
        if (!isActiveElementValid()) return; // 防止输入框删除
        // 选中上一个组件
        dispatch(selectPrevComponent());
    });
    // 选中下一个
    useKeyPress(['downarrow'], () => {
        if (!isActiveElementValid()) return; // 防止输入框删除
        // 选中下一个组件
        dispatch(selectNextComponent());
    });
    // 撤销
    useKeyPress(['ctrl.z', 'meta.z'], () => {
        if (!isActiveElementValid()) return; // 防止输入框删除
        // 选中下一个组件
        dispatch(UndoActionCreators.undo());
    }, { exactMatch: true });// 严格匹配按键
    // 重做
    useKeyPress(['ctrl.shift.z', 'meta.shift.z'], () => {
        if (!isActiveElementValid()) return; // 防止输入框删除
        // 选中下一个组件
        dispatch(UndoActionCreators.redo());
    });
};

export default useKeydown;