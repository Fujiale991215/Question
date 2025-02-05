import { FC, useEffect, useState } from "react";
import { Typography } from "antd";
import { getChart } from "../../../server/stat";
import { useParams } from "react-router-dom";
import { getComponentConfByType } from "../../../components/QuestionComponents/index.interface";
const { Title } = Typography;
type PropsType = {
    selectedId: string;
    selectComponentType: string;
};
const ChartStat: FC<PropsType> = (props: PropsType) => {
    // 获取问卷主键
    const { cardId } = useParams() || { cardId: "" };
    // 解构
    const { selectedId, selectComponentType } = props;
    // 统计数据
    const [statList, setStatList] = useState([]);
    // 生命周期
    useEffect(() => {
        selectedId && getChartData();
    }, [selectedId]);
    // 获取图表数据请求
    const getChartData = async () => {
        const data = {
            cardId,
            componentId: selectedId,
        };
        const res = await getChart(data);
        if (res.code === 200) {
            setStatList(res.data);
        }
    };
    // 生成元素
    const genStatElem = () => {
        if (!selectedId) return <div>请选择一个组件</div>;
        // 获取统计组件
        const { StatComponent } = getComponentConfByType(selectComponentType) || {};
        if (!StatComponent) return <div>该组件不支持统计</div>;
        return <StatComponent stat={statList} />;
    };
    return <>
        <Title level={3}>图表统计</Title>
        <div>{genStatElem()}</div>
    </>;
};

export default ChartStat;