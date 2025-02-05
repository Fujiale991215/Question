import { useState, useEffect } from "react";
import QuestionCard from "../../components/QuestionCard";
import ListSearch from "../../components/ListSearch";
import { Typography, Spin, Empty, message } from "antd";
import Page from "../../common/components/Pagination";
import "./scss/List.scss";
import listInterface from "./Interface/questionInterface";
import pageModel from "../../common/model/PageModel";
import { setDeleteOne, setDuplicate, getAllListPage } from "../../server/question/index";
import { useSelector } from "react-redux";
const { Title } = Typography;
function List() {
    // 生命周期
    useEffect(() => {
        getAllList();
    }, []);
    // 获取用户数据
    const { userId } = JSON.parse(localStorage.getItem("question_userInfo") || "{}");
    // 模拟数据列表
    const [list, setList] = useState<listInterface[]>([]);
    // 控制loading效果
    const [loading, setLoading] = useState<boolean>(false);
    // 数据总数
    const [total, setTotal] = useState<number>(0);
    // 请求参数
    const data = new pageModel().get({ userId });
    // 获取问卷列表
    const getAllList = async () => {
        setLoading(true);
        const res = await getAllListPage(data);
        if (res.code === 200) {
            setLoading(false);
            setTotal(res.data.total);
            setList(res.data.dataList);
        }
    };
    // 删除问卷
    const Delete = async (cardId: number) => {
        const res = await setDeleteOne({ cardId });
        if (res.code === 200) {
            message.success(res.msg);
            getAllList();
        }
    };
    // 分页器发生变化的回调
    const pageChange = (page: any) => {
        data.current = page.current;
        data.pageSize = page.pageSize;
        getAllList();
    };
    // 搜索函数
    const search = (title: string) => {
        data.conditions = {
            title,
        };
        getAllList();
    };
    // 复制函数
    const duplicate = async (cardId: string) => {
        const res = await setDuplicate(cardId);
        if (res.code === 200) {
            message.success(res.msg);
            getAllList();
        }
    };
    return (
        <div>
            <div className="list-header">
                <div className="list-header-left">
                    <Title level={3}>我的问卷</Title>
                </div>
                <ListSearch search={search}></ListSearch>
            </div>
            <Spin spinning={loading} tip="全力加载中...">
                <div className="list-content">
                    {list.length ? list.map((x: listInterface) => {
                        return <QuestionCard key={x.cardId} {...x} Delete={Delete} update={getAllList} duplicate={duplicate}></QuestionCard>;
                    }) : <Empty description="暂无数据" />}
                </div>
            </Spin>
            <div>
                <Page pageChange={pageChange} total={total}></Page>
            </div>
        </div>
    );
}

export default List;
