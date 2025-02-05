import React, { FC } from "react";
import { Outlet } from "react-router-dom";
import { Button, Space, Divider, message } from "antd";
import { BarsOutlined, DeleteOutlined, PlusOutlined, StarOutlined } from "@ant-design/icons";
import "./scss/styles.scss";
import { useNavigate, useLocation } from "react-router-dom";
const ManageLayout: FC = () => {
	//路由跳转功能函数
	const nav = useNavigate();
	//获取当前路由路径
	const { pathname } = useLocation();
	// 获取左侧按钮高亮状态
	const isListActive = (nav: string) => {
		return pathname.startsWith(nav) ? "primary" : "default";
	};
	//新建问卷
	const handleCreateCard = async () => {
		nav(`/question/edit`);
	};
	//我的问卷
	const myTest = () => {
		nav("/manage/list");
	};
	//星标问卷
	const starTest = () => {
		nav("/manage/star");
	};
	//回收站
	const trash = () => {
		nav("/manage/trash");
	};
	return (
		<div className="container">
			<div className="left">
				<Space direction="vertical">
					<Button type="primary" size="large" icon={<PlusOutlined />} onClick={handleCreateCard}>
						新建问卷
					</Button>
					<Divider style={{ borderTop: "transparent" }} />
					<Button onClick={myTest} type={isListActive("/manage/list")} size="large" icon={<BarsOutlined />}>
						我的问卷
					</Button>
					<Button onClick={starTest} type={isListActive("/manage/star")} size="large" icon={<StarOutlined />}>
						星标问卷
					</Button>
					<Button onClick={trash} type={isListActive("/manage/trash")} size="large" icon={<DeleteOutlined />}>
						回收站
					</Button>
				</Space>
			</div>
			<div className="right">
				<Outlet />
			</div>
		</div>
	);
};

export default ManageLayout;
