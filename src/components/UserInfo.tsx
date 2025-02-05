import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LOGIN_PATHNAME } from "../router";
import { SettingTwoTone, TeamOutlined, UserOutlined, RocketTwoTone } from "@ant-design/icons";
import { Dropdown, message, Space } from "antd";
import { logout } from "../pages/store/user";
import { useDispatch } from "react-redux";
const UserInfo = (props: any) => {
    const dispatch = useDispatch();
    // 获取当前登录人信息
    const { userInfo } = props;
    // 控制弹出框
    const token = localStorage.getItem("question_access_token");
    // 路由导航
    const nav = useNavigate();
    // 路由路径
    const map: any = {
        1: "/",
        2: "/",
    };
    // 定义下拉菜单
    const items = [
        {
            key: 1,
            label: "个人信息",
            icon: <TeamOutlined style={{ color: "#3089ff" }} />,
            path: "/",
        },
        {
            key: 2,
            label: "设置",
            icon: <SettingTwoTone />,
        },
        {
            key: 3,
            label: "退出登录",
            icon: <RocketTwoTone />,
        },
    ];
    // 点击父菜单
    const handleClick = (e: any) => {
        e.preventDefault();
    };
    // 点击下拉菜单
    const onClick = (value: any) => {
        if (value.key == 3) {
            dispatch(logout());
            localStorage.removeItem("question_access_token");
            localStorage.removeItem("question_refreshToken_token");
            localStorage.removeItem("question_userInfo");
            nav(LOGIN_PATHNAME);
            message.success("退出成功");
            return;
        }
        nav(map[value.key]);
    };
    return (
        <>
            {userInfo.userId ? (
                <Dropdown menu={{ items, onClick }} trigger={["click"]}>
                    <a onClick={handleClick}>
                        <Space>
                            {userInfo.nickName}
                            <UserOutlined />
                        </Space>
                    </a>
                </Dropdown>
            ) : (
                <Link to={"/login"}>
                    <Space>
                        请登录
                        <UserOutlined />
                    </Space>
                </Link>
            )}
        </>
    );
};

export default UserInfo;
