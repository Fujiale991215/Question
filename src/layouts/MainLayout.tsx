import { FC, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Layout } from "antd";
import Logo from "../components/Logo";
import Suggestion from "../components/Suggestion";
import UserInfo from "../components/UserInfo";
import "./scss/MainLayout.moudule.scss";
const MainLayout: FC = () => {
    const { Header, Content, Footer } = Layout;
    // 用户信息
    const userInfo = JSON.parse(localStorage.getItem("question_userInfo") || "{}");
    const nav = useNavigate();
    useEffect(() => {
        if (userInfo.userId) {
            nav("/manage/list");
        }
    }, []);

    return (
        <Layout>
            <Header className="mainlayout-header">
                <div className="mainlayout-left">
                    <Logo />
                </div>
                <div className="mainlayout-right">
                    <Suggestion />
                    <UserInfo userInfo={userInfo}></UserInfo>
                </div>
            </Header>
            <Content className="mainlayout-main">
                <Outlet />
            </Content>
            <Footer className="mainlayout-footer">MainLayout Footer 小慕问卷 &copy; 2024 - created by Fjl</Footer>
        </Layout>
    );
};

export default MainLayout;
