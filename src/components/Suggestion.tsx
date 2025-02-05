import { TwitchOutlined } from "@ant-design/icons";
import { FC } from "react";
import "./scss/Suggestion.scss";
import { useNavigate } from "react-router-dom";
const Suggestion: FC = () => {
    // 路由跳转
    const nav = useNavigate();
    // 跳转意见箱界面
    const handleClick = () => {
        nav("/suggestion");
    };
    return <div className="sugesstion-container" onClick={handleClick}>
        <TwitchOutlined style={{ color: "#fff", fontSize: "30px" }} />
        <div>意见箱</div>
    </div>;
};
export default Suggestion;