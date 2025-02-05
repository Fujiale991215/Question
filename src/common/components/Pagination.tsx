import React, { useCallback, useState } from "react";
import { Pagination } from "antd";

const Page = (prop: any) => {
	const { pageChange, total } = prop;
	/** 修改分页器指示内容 */
	const locale = {
		items_per_page: "/ 页",
		jump_to: "去",
		jump_to_confirm: "确认",
		page: "页",
	};
	/** 每页的条数 */
	const [pageSize, setPageSize] = useState(10);
	/** 当前页码 */
	const [current, setCurrent] = useState(1);
	/** 分页器改变 */
    const handleChage = (current: number, pageSize: number) => {
		setCurrent(current);
		setPageSize(pageSize);
		pageChange({ current, pageSize });
	};
	return (
		<>
			<Pagination
				locale={locale}
				current={current}
				pageSize={pageSize}
				total={total}
				pageSizeOptions={[10, 20, 30, 40, 50]}
				showSizeChanger
				onChange={handleChage}
				showQuickJumper
				showTotal={(total) => `共 ${total} 条`}
			></Pagination>
		</>
	);
};

export default Page;
