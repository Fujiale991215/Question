import React, { FC, useEffect } from "react";
import { Button, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import { MANAGE_INDEX_PATHNAME, LOGIN_PATHNAME } from "../router";
import "./scss/Home.scss";
const { Title, Paragraph } = Typography;
const Home: FC = () => {
	// 注册路由跳转
	const nav = useNavigate();
	// 开始使用
	const start = () => {
		if (localStorage.getItem("questionnaireToken")) {
			nav(MANAGE_INDEX_PATHNAME);
		} else {
			nav(LOGIN_PATHNAME);
		}
	};
	return (
		<div className="home-Container">
			<div className="info">
				<Title>问卷调查 | 在线投票</Title>
				<Paragraph>已累计创建问卷 100 份, 发布问卷 90 份, 收到答卷 980 份</Paragraph>
				<div>
					<Button type="primary" onClick={start}>
						开始使用
					</Button>
				</div>
			</div>
		</div>
	);
};

export default Home;
