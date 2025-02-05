import "./scss/questionCard.scss";
import { Button, Space, Divider, Tag, Popconfirm, Modal, message } from "antd";
import { CopyOutlined, DeleteOutlined, EditOutlined, LineChartOutlined, StarOutlined, StarTwoTone } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import { setStar } from "../server/question/index";
const { confirm } = Modal;
const QuestionCard = (props: any) => {
    const { isStar, cardId, title, createDate, answerCount, isPublished, Delete, update, duplicate } = props;
    const nav: any = useNavigate();
    //复制函数
    const copy = () => {
        duplicate(cardId);
    };
    //删除函数
    const handleDelete = () => {
        confirm({
            title: "确定删除该问卷吗?",
            okText: "确定",
            cancelText: "取消",
            onOk: () => Delete(cardId),
            onCancel: () => { },
        });
    };
    // 标星/取消标星
    const handleSetStar = async () => {
        const data = {
            cardId,
            isStar,
        };
        const res = await setStar(data);
        if (res.code === 200) {
            message.success("修改成功");
            update();
        }
    };
    // 跳转到编辑问卷列表
    const handleEdit = () => {
        nav(`/question/edit/${cardId}`);
    };
    // 跳转到问卷统计界面
    const handleStat = () => {
        nav(`/question/stat/${cardId}`);
    };
    return (
        <div className="question-card-container">
            <div className="question-card-title">
                <div className="question-card-title-left">
                    <Link to={isPublished ? `/question/stat/${cardId}` : `/question/edit/${cardId}`}>
                        <Space>
                            {isStar && <StarOutlined style={{ color: "red", fontSize: "20px" }} />}
                            {title}
                        </Space>
                    </Link>
                </div>
                <div className="question-card-title-right">
                    <Space>
                        {isPublished ? <Tag color="processing">已发布</Tag> : <Tag>未发布</Tag>}&nbsp;
                        <span>答卷:{answerCount}</span>&nbsp;
                        <span>{createDate}</span>
                    </Space>
                </div>
            </div>
            <Divider style={{ margin: "12px" }} />
            <div className="question-card-button">
                <div className="question-card-button-left">
                    <Space>
                        <Button icon={<EditOutlined style={{ fontSize: "16px" }} />} type="text" size="small" onClick={handleEdit}>
                            编辑问卷
                        </Button>
                        <Button icon={<LineChartOutlined style={{ fontSize: "16px" }} />} type="text" size="small" onClick={handleStat} disabled={!isPublished}>
                            问卷统计
                        </Button>
                    </Space>
                </div>
                <div className="question-card-button-right">
                    <Space>
                        <Button icon={isStar ? <StarTwoTone style={{ fontSize: "16px" }} /> : <StarOutlined style={{ fontSize: "16px" }} />} type="text" size="small" onClick={handleSetStar}>
                            {isStar ? "取消标星" : "标星"}
                        </Button>
                        <Popconfirm title="确定复制该问卷吗?" okText="确定" cancelText="取消" onConfirm={copy}>
                            <Button icon={<CopyOutlined style={{ fontSize: "16px" }} />} type="text" size="small">
                                复制
                            </Button>
                        </Popconfirm>
                        <Button icon={<DeleteOutlined style={{ fontSize: "16px" }} />} type="text" size="small" onClick={handleDelete}>
                            删除
                        </Button>
                    </Space>
                </div>
            </div>
        </div>
    );
};

export default QuestionCard;
