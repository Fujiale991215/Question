import React, { FC } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { Spin } from "antd";
const QuestionLayout: FC = () => {
	// 配置路由导航
	const nav = useNavigate();
	// 获取用户信息
    const userInfo = JSON.parse(localStorage.getItem("question_userInfo") || "{}");
	return (
		<div style={{ height: "100vh" }}>
			{userInfo.userId ? (
				<Outlet />
			) : (
				<div style={{ textAlign: "center", marginTop: "60px" }}>
					<Spin></Spin>
				</div>
			)}
		</div>
	);
};

export default QuestionLayout;
