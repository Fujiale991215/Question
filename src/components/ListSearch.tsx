import { ChangeEvent, FC, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Input } from "antd";
const { Search } = Input;
const ListSearch: any = (prop: any) => {
	// 解构搜索函数,传入的函数名称必须得是这个
	const { search } = prop;
	const nav = useNavigate();
	const { pathname } = useLocation();
	// 搜索框的值
	const [value, setValue] = useState<string>("");
	// 搜索框变化事件
	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setValue(e.target.value);
	};
	// 搜索函数
	const handleSearch = (val: string) => {
		search(val);
	};
	return (
		<>
			<Search placeholder="请输入关键字" value={value} size="large" allowClear onSearch={handleSearch} onChange={handleChange} style={{ width: 260 }} />
		</>
	);
};

export default ListSearch;
