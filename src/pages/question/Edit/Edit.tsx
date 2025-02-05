import { useEffect, useRef, useState } from "react";
import EditHeader from "./EditHeader";
import EditCanvas from "./EditCanvas";
import LeftPanels from "./LeftPanels";
import RightPanel from "./RightPanel";
import { useParams } from "react-router-dom";
import { getQuestionInfo } from "../../../server/question/index";
import { useDispatch } from "react-redux";
import { resetComponents, changeSelectId } from "../../store/components";
import { resetPageInfo } from "../../store/pageInfo";
import useGetPageInfo from "../../../hooks/getPageInfo";
import { useTitle } from "ahooks";
import TAB_KEYS from "../model/TabKeysEnum";
import "../scss/Edit.scss";
const Edit: any = () => {
    // 问卷主键
    const { cardId } = useParams() || { cardId: "" };
    // loading效果
    const [loading, setLoading] = useState(false);
    // 派发请求
    const dispatch = useDispatch();
    // 获取页面信息
    const { title } = useGetPageInfo();
    // 图层Ref
    const pageRef = useRef(null);
    // 设置标题
    useTitle(`问卷编辑 - ${title}`);
    // 生命周期函数
    useEffect(() => {
        handleGetQuestionInfo();
    }, []);
    // 获取单个问卷信息
    const handleGetQuestionInfo = async () => {
        setLoading(true);
        if (!cardId) {
            setLoading(false);
            dispatch(resetComponents([] as any));
            dispatch(resetPageInfo({ css: "", js: "", title: "", desc: "", isPublished: false }));
            return;
        }
        const res = await getQuestionInfo(cardId as string);
        if (res.code === 200) {
            const { css = "", js = "", title = "", desc = "", componentList = [], isPublished = false } = res.data;
            setLoading(false);
            // 初始化问卷列表
            dispatch(resetComponents(componentList));
            // 初始化页面信息
            dispatch(resetPageInfo({ css, js, title, desc, isPublished }));
        }
        setLoading(false);
    };
    // 取消高亮状态
    const handleCancelHighlight = () => {
        dispatch(changeSelectId(""));
    };
    // 修改页面loading效果
    const changeLoading = (loading: boolean) => {
        setLoading(loading);
    };
    const change = () => {
        (pageRef.current as any).pageRef.current.handleClick().then(() => { }).catch((err: any) => {
            (pageRef.current as any).handleChange(TAB_KEYS.SETTING_KEY);
        });
    };
    return <div className="edit-container">
        <EditHeader changeLoading={changeLoading} change={change} />
        <div className="edit-wrapper">
            <div className="edit-content">
                <div className="edit-content-left">
                    <LeftPanels />
                </div>
                <div className="edit-content-middle" onClick={handleCancelHighlight}>
                    <div className="edit-content-middle-canvas">
                        <EditCanvas loading={loading} />
                    </div>
                </div>
                <div className="edit-content-right">
                    <RightPanel ref={pageRef} />
                </div>
            </div>
        </div>
    </div>;
};

export default Edit;
