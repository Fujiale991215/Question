import React, { FC, useEffect, useState } from "react";
import QuestionCard from "../../components/QuestionCard";
import { Typography, Empty, message, Spin } from "antd";
import ListSearch from "../../components/ListSearch";
import "./scss/List.scss";
import { getAllListNoPage, setDeleteOne, setDuplicate } from "../../server/question/index";
import listInterface from "./Interface/questionInterface";
import { useSelector } from "react-redux";
const { Title } = Typography;
const Star: FC = () => {
    // 生命周期
    useEffect(() => {
        getStarList();
    }, []);
    // 获取用户数据
    const { userId } = JSON.parse(localStorage.getItem("question_userInfo") || "{}");
    //模拟数据
    const [list, setList] = useState<listInterface[]>([]);
    // 控制loading效果
    const [loading, setLoading] = useState<boolean>(false);
    // 获取星标问卷列表
    const getStarList = async (title?: string) => {
        const data = {
            isStar: true,
            title,
            userId
        };
        setLoading(true);
        const res = await getAllListNoPage(data);
        if (res.code === 200) {
            setLoading(false);
            setList(res.data);
        }
    };
    //删除问卷
    const Delete = async (cardId: number) => {
        const res = await setDeleteOne({ cardId });
        if (res.code === 200) {
            message.success(res.msg);
            getStarList();
        }
    };
    // 搜索函数
    const search = (title: string) => {
        getStarList(title);
    };
    // 复制函数
    const duplicate = async (cardId: string) => {
        const res = await setDuplicate(cardId);
        if (res.code === 200) {
            message.success(res.msg);
            getStarList();
        }
    };
    return (
        <>
            <div className="list-header">
                <div className="list-header-left">
                    <Title level={3}>星标问卷</Title>
                </div>
                <ListSearch search={search}></ListSearch>
            </div>
            <Spin spinning={loading} tip="全力加载中...">
                <div className="list-content">
                    {list.length ? list.map((x: listInterface) => {
                        return <QuestionCard key={x.cardId} {...x} Delete={Delete} update={getStarList} duplicate={duplicate}></QuestionCard>;
                    }) : <Empty description="暂无数据" />}
                </div>
            </Spin>
        </>
    );
};

export default Star;
