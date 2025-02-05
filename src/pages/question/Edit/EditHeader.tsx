import { FC, useState } from "react";
import EditToolbar from "./EditToolbar";
import { Button, Typography, Space, Input, message } from "antd";
import { CheckOutlined, EditOutlined, LeftOutlined, LoadingOutlined, SendOutlined, SnippetsOutlined } from "@ant-design/icons";
import { useNavigate, useParams } from "react-router-dom";
import useGetPageInfo from "../../../hooks/getPageInfo";
import getComponentInfo from "../../../hooks/getComponentInfo";
import { changeTitle } from "../../store/pageInfo";
import { useDispatch } from "react-redux";
import { saveOrUpdateQuestion, setPublish } from "../../../server/question";
import { useKeyPress } from "ahooks";
import "../scss/EditHeader.scss";
const { Title } = Typography;
// 编辑器头部
const EditHeader: FC<any> = (props: any) => {
    const { changeLoading, change } = props;
    const { cardId } = useParams() || { cardId: "" };
    // 第一次保存之后生成的cardId,作为之后修改的依据
    const [newCardId, setNewCardId] = useState("");
    // 用户信息
    const { userId } = JSON.parse(localStorage.getItem("question_userInfo") || "{}");
    // 导航实例
    const nav = useNavigate();
    // 显示和修改标题
    const TitleElement: FC = () => {
        // 派发请求
        const dispatch = useDispatch();
        // 获取问卷信息
        const { title } = useGetPageInfo();
        // 修改标题
        const [editState, setEditState] = useState(false);
        // 修改标题函数
        const handleChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
            dispatch(changeTitle(e.target.value.trim()));
        };
        if (editState) {
            return <Input value={title} onPressEnter={() => setEditState(false)} onBlur={() => setEditState(false)} onChange={handleChangeTitle} />;
        }
        return <Space>
            <Title>{title}</Title>
            <Button icon={<EditOutlined />} type="text" onClick={() => setEditState(true)} />
        </Space>;
    };

    // 保存按钮
    const SaveButton: FC<{ content: string; }> = ({ content = "" }) => {
        // 获取按钮loading效果
        const [loading, setLoading] = useState(false);
        // 保存pageInfo componentList
        const { componentList } = getComponentInfo();
        const pageInfo = useGetPageInfo();
        const handleSave = async () => {
            change();
            const { title = "" } = pageInfo;
            if (!title) {
                message.error("请输入问卷标题");
                return;
            }
            const data = {
                userId,
                cardId: newCardId ? newCardId : cardId,
                ...pageInfo,
                componentList
            };
            setLoading(true);
            changeLoading(true);
            const res = await saveOrUpdateQuestion(data);
            if (res.code === 200) {
                message.success("保存成功");
                setNewCardId(res.data.cardId);
                changeLoading(false);
                setLoading(false);
            }
            changeLoading(false);
            setLoading(false);
        };
        // 快捷键 Ctrl + s;meta + s
        useKeyPress(["ctrl.s", "meta.s"], (event: KeyboardEvent) => {
            event.preventDefault();
            if (!loading) {
                handleSave();
            }
        });
        return <Button style={{ color: content == '保存' ? "#000" : "#52c41a", backgroundColor: content == '保存' ? "#fff" : "#f6ffed" }} icon={Icon(content, loading)} onClick={handleSave} disabled={loading}>{content}</Button>;
    };
    // 发布按钮
    const PublishedButton: FC = () => {
        // 导航链接
        const nav = useNavigate();
        // 获取按钮loading效果
        const [loading, setLoading] = useState(false);
        // 保存pageInfo componentList
        const { componentList } = getComponentInfo();
        const pageInfo = useGetPageInfo();
        const [pub, setPub] = useState(pageInfo.isPublished);
        // 发布问卷信息
        const handlePublished = async () => {
            const data = {
                userId,
                cardId: newCardId ? newCardId : cardId,
                ...pageInfo,
                componentList,
            };
            setLoading(true);
            changeLoading(true);
            if (!cardId && !newCardId) {
                const res = await saveOrUpdateQuestion(data);
                if (res.code === 200) {
                    setLoading(false);
                    changeLoading(false);
                    setPub(true);
                    message.success("发布成功");
                    nav(`/question/stat/${cardId}`);
                }
            }
            if (cardId || newCardId) {
                const res = await setPublish({ cardId: cardId || newCardId });
                if (res.code === 200) {
                    setPub(res.data.isPublished);
                    if (res.data.isPublished) {
                        message.success("发布成功");
                        nav(`/question/stat/${cardId}`);
                    } else {
                        message.success("取消成功");
                    }
                }
            }
            changeLoading(false);
            setLoading(false);
        };
        return <Button type="primary" icon={loading ? < LoadingOutlined /> : <SendOutlined />} disabled={loading} onClick={handlePublished}>{pub ? "取消发布" : "发布"}</Button>;
    };
    // 保存/存草稿按钮图标逻辑
    const Icon = (content: string, loading: boolean) => {
        if (content == "保存") {
            if (loading) return <LoadingOutlined />;
            return <CheckOutlined />;
        }
        return <SnippetsOutlined />;
    };
    return <div className="editHeader-container">
        <div className="editHeader-content">
            <div className="editHeader-content-left">
                <Space>
                    <Button type="link" icon={<LeftOutlined />} onClick={() => nav(-1)}>返回</Button>
                    <TitleElement />
                </Space>
            </div>
            <div className="editHeader-content-middle">
                <EditToolbar />
            </div>
            <div className="editHeader-content-right">
                <Space>
                    <SaveButton content="存草稿" />
                    <SaveButton content="保存" />
                    <PublishedButton />
                </Space>
            </div>
        </div>
    </div>;
};

export default EditHeader;