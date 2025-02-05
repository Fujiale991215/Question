import React, { FC } from "react";
import { Space, Typography } from "antd";
import { FormOutlined } from "@ant-design/icons";
import "./scss/Logo.scss";
const { Title } = Typography;
const Logo: FC = () => {
	return (
		<div className="Logocontainer">
			<Space>
				<Title>
					<FormOutlined />
				</Title>
				<Title>问卷星</Title>
			</Space>
		</div>
	);
};
export default Logo;
