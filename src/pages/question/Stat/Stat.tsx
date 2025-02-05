import React, { FC, useEffect, useState } from "react";
import StatHeader from "./StatHeader";
import ComponentList from "./ComponentList";
import PageStat from "./PageStat";
import ChartStat from "./ChartStat";
import { Spin, Result, Button } from "antd";
import { getQuestionInfo } from "../../../server/question/index";
import { useDispatch } from "react-redux";
import { resetComponents } from "../../store/components";
import { resetPageInfo } from "../../store/pageInfo";
import { useNavigate, useParams } from "react-router-dom";
import useGetPageInfo from "../../../hooks/getPageInfo";
import { useTitle } from "ahooks";
import "../scss/Stat.scss";
// 判断是否加载完成
const LoadingElement = <div style={{ textAlign: "center", marginTop: "60px" }}>
    <Spin />;
</div>;
const Stat: FC = () => {
    // 状态提升 selectId,componentType
    const [selectedId, setSelectedId] = useState<string>("");
    const [selectComponentType, setSelectComponentType] = useState<string>("");
    // 导航链接
    const nav = useNavigate();
    // 获取ID
    const { cardId } = useParams() || { cardId: "" };
    // loading效果
    const [loading, setLoading] = useState(false);
    // 获取问卷发布状态
    const { isPublished, title } = useGetPageInfo();
    // 修改标题
    useTitle(`问卷统计 - ${title}`);
    // 派发请求
    const dispatch = useDispatch();
    // 生命周期函数
    useEffect(() => {
        handleGetQuestionInfo();
    }, []);
    // 获取单个问卷信息
    const handleGetQuestionInfo = async () => {
        setLoading(true);
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
    // 创建内容元素
    const genContentElem = () => {
        // 判断问卷是否发布
        if (typeof isPublished === 'boolean' && !isPublished) {
            return <div style={{ flex: "1" }}>
                <Result status="warning" title="该页面尚未发布" extra={
                    <Button type="primary" onClick={() => nav(-1)}>
                        返回
                    </Button>
                }>
                </Result>
            </div >;
        }
        return <>
            <div className="stat-main-left">
                <ComponentList selectedId={selectedId} setSelectedId={setSelectedId} setSelectComponentType={setSelectComponentType} />
            </div>
            <div className="stat-main-middle">
                <PageStat selectedId={selectedId} setSelectedId={setSelectedId} setSelectComponentType={setSelectComponentType} />
            </div>
            <div className="stat-main-right">
                <ChartStat selectedId={selectedId} selectComponentType={selectComponentType} />
            </div>
        </>;
    };
    return <div className="stat-container">
        <StatHeader cardId={cardId as string} />
        <div className="stat-content-wrapper">
            {loading && LoadingElement}
            {!loading && <div className="stat-content-main">{genContentElem()}</div>}
        </div>
    </div>;
};

export default Stat;
