import React, { FC, useEffect, useState } from "react";
import { Empty, Typography, Table, Tag, Button, Space, Modal, Spin, message } from "antd";
import "./scss/List.scss";
import ListSearch from "../../components/ListSearch";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { getAllListNoPage, setRecover, setDeleteByIds } from "../../server/question/index";
import listInterface from "./Interface/questionInterface";
import { useSelector } from "react-redux";
const { Title } = Typography;
const { confirm } = Modal;
const Trash: FC = () => {
    // 生命周期
    useEffect(() => {
        getTrashList();
    }, []);
    // 获取用户数据
    const { userId } = JSON.parse(localStorage.getItem("question_userInfo") || "{}");
    // 模拟数据
    const [list, setList] = useState<listInterface[]>([]);
    // 控制loading效果
    const [loading, setLoading] = useState<boolean>(false);
    // 表格列
    const columns = [
        {
            title: "标题",
            dataIndex: "title",
        },
        {
            title: "是否发布",
            dataIndex: "isPublished",
            render: (isPublished: boolean) => (isPublished ? <Tag color="processing">已发布</Tag> : <Tag>未发布</Tag>),
        },
        {
            title: "答卷数",
            dataIndex: "answerCount",
        },
        {
            title: "创建时间",
            dataIndex: "createDate",
        },
    ];
    const [selectIds, setSelectIds] = useState<string[]>([]);
    // 获取回收站问卷列表
    const getTrashList = async (title?: string) => {
        const data = {
            title,
            userId,
            isDeleted: true,
        };
        setLoading(true);
        const res = await getAllListNoPage(data);
        if (res.code === 200) {
            setLoading(false);
            setList(res.data);
        }
    };
    // 搜索函数
    const search = (title: string) => {
        getTrashList(title);
    };
    // 恢复函数
    const Recover = () => {
        confirm({
            title: "确认恢复该问卷吗",
            icon: <ExclamationCircleOutlined />,
            content: "此操作将恢复你的问卷,确认继续吗",
            okText: "确认",
            cancelText: "取消",
            onOk: async () => {
                const res = await setRecover({ cardIds: selectIds });
                setLoading(true);
                if (res.code === 200) {
                    message.success("恢复成功");
                    setLoading(false);
                    getTrashList();
                    setSelectIds([]);
                }
            },
        });
    };
    // 删除函数
    const Delete = () => {
        confirm({
            title: "确认彻底删除该问卷吗",
            icon: <ExclamationCircleOutlined />,
            content: "此操作不可逆转，请谨慎操作",
            okText: "确认",
            cancelText: "取消",
            onOk: async () => {
                const res = await setDeleteByIds({ cardIds: selectIds });
                setLoading(true);
                if (res.code === 200) {
                    message.success("删除成功");
                    getTrashList();
                    setLoading(false);
                    setSelectIds([]);
                }
            },
        });
    };
    // 选择行的回调
    const handleColumnChange = (keys: any) => {
        setSelectIds(keys);
    };
    return (
        <>
            <div className="list-header">
                <div className="list-header-left">
                    <Title level={3}>回收站</Title>
                </div>
                <ListSearch search={search}></ListSearch>
            </div>
            <Spin spinning={loading} tip="全力加载中...">
                <div className="list-content">
                    <div style={{ marginBottom: "16px" }}>
                        <Space>
                            <Button type="primary" onClick={Recover} disabled={!selectIds.length}>
                                恢复
                            </Button>
                            <Button danger disabled={!selectIds.length} onClick={Delete}>
                                删除
                            </Button>
                        </Space>
                    </div>
                    {list.length ? (
                        <Table
                            dataSource={list}
                            columns={columns}
                            pagination={false}
                            rowKey={(x) => x.cardId}
                            rowSelection={{
                                type: "checkbox",
                                onChange: handleColumnChange,
                            }}
                        />
                    ) : (
                        <Empty description="暂无数据" />
                    )}
                </div>
            </Spin>
        </>
    );
};

export default Trash;
