import { FC, useRef } from "react";
import { Space, Button, Typography, Input, Tooltip, InputRef, message, Popover } from "antd";
import { useNavigate } from "react-router-dom";
import { CopyOutlined, LeftOutlined, QrcodeOutlined } from "@ant-design/icons";
import useGetPageInfo from "../../../hooks/getPageInfo";
import { QRCodeCanvas } from "qrcode.react";
import "../scss/StatHeader.scss";
const { Title } = Typography;
interface StatHeaderProps {
    cardId: string;
}
const StatHeader: FC<StatHeaderProps> = (props: StatHeaderProps) => {
    // 获取cardId
    const { cardId } = props;
    // 导航链接
    const nav = useNavigate();
    // 获取用户信息
    const { title, isPublished } = useGetPageInfo();
    // 拷贝链接函数
    const urlInputRef = useRef<InputRef>(null);
    const copyLink = () => {
        const el = urlInputRef.current;
        if (!el) return null;
        el.select();
        document.execCommand("copy"); //拷贝选中内容
        message.success("拷贝成功");
    };
    // 生成链接与二维码
    const genLinkAndQRCode = () => {
        if (!isPublished) return null;
        // 拼接URL
        const url = `http://8.217.54.128:3100/question/${cardId}`;
        // 定义二维码组件
        const QRCodeEle = <div style={{ textAlign: "center" }}>
            <QRCodeCanvas value={url} size={150} />
        </div>;
        return <Space>
            <Input value={url} style={{ width: '300px' }} ref={urlInputRef} />
            <Tooltip title="拷贝链接">
                <Button icon={<CopyOutlined />} onClick={copyLink}></Button>
            </Tooltip>
            <Popover content={QRCodeEle}>
                <Button icon={<QrcodeOutlined />}></Button>
            </Popover>
        </Space>;
    };
    return <div className="stat-header-container">
        <div className="stat-header-content">
            <div className="stat-header-left">
                <Space>
                    <Button type="link" icon={<LeftOutlined />} onClick={() => nav(-1)}>返回</Button>
                    <Title>{title}</Title>
                </Space>
            </div>
            <div className="stat-header-middle">{genLinkAndQRCode()}</div>
            <div className="stat-header-right">
                <Button type="primary" onClick={() => nav(`/question/edit/${cardId}`)}>编辑问卷</Button>
            </div>
        </div>
    </div>;
};
export default StatHeader;