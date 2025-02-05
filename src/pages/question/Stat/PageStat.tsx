import { FC, useEffect, useState } from "react";
import { Typography, Spin, Table } from "antd";
import { getAllListPage } from "../../../server/stat";
import { useParams } from "react-router-dom";
import pageModel from "../../../common/model/PageModel";
import getComponentInfo from "../../../hooks/getComponentInfo";
import type { ComponentInfoType } from "../../../pages/store/components";
import Page from "../../../common/components/Pagination";
const { Title } = Typography;
type PropsType = {
    selectedId: string;
    setSelectedId: (id: string) => void;
    setSelectComponentType: (type: string) => void;
};
const PageStat: FC<PropsType> = (props: PropsType) => {
    const { selectedId, setSelectedId, setSelectComponentType } = props;
    // 获取ID
    const { cardId } = useParams() || { cardId: "" };
    // 加载效果
    const [loading, setLoading] = useState(false);
    // 数据总数
    const [total, setTotal] = useState(0);
    // 数据列表
    const [list, setList] = useState([]);
    // 获取表格数据
    const { componentList } = getComponentInfo();
    // 表格列
    const columns = componentList.map((item: ComponentInfoType) => {
        const { componentId } = item;
        const colTitle = item.componentProps!.title || item.componentTitle;
        return {
            dataIndex: componentId,
            title: <div style={{ cursor: "pointer" }} onClick={() => {
                setSelectedId(componentId as string);
                setSelectComponentType(item.componentType as string);
            }}>
                {<span style={{ color: componentId == selectedId ? "#1890ff" : "#000" }}>{colTitle}</span>}
            </div>
        };
    });
    const dataSource = list.map((item: any) => ({ ...item, key: item.answerId }));
    // 定义表格元素
    const TableEle = <div style={{ height: "calc(100vh - 190px)" }}>
        <Table columns={columns} dataSource={dataSource} pagination={false}></Table>
    </div>;
    // 生命周期函数
    useEffect(() => {
        handleGetAllStatList();
    }, []);
    // 请求参数
    const data = new pageModel().get({ cardId });
    const handleGetAllStatList = async () => {
        setLoading(true);
        const res = await getAllListPage(data);
        if (res.code === 200) {
            setLoading(false);
            setTotal(res.data.total);
            setList(res.data.dataList);
        }
        setLoading(false);
    };
    // 分页器变化
    const pageChange = (page: any) => {
        data.current = page.current;
        data.pageSize = page.pageSize;
        handleGetAllStatList();
    };
    return <div>
        <Title level={3}>答卷数量：{!loading && total}</Title>
        {loading && <div style={{ textAlign: "center", height: "calc(100vh - 190px)" }}>
            <Spin />
        </div>}
        {!loading && TableEle}
        <Page pageChange={pageChange} total={total}></Page>
    </div>;
};

export default PageStat;