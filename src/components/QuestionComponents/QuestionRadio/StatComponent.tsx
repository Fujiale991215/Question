import { FC, useMemo } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { COLOR_LIST } from "../../../common/constance/index";
import type { QuestionRadioStatPropsType } from "./interface";
const StatComponent: FC<QuestionRadioStatPropsType> = ({ stat = [] }) => {
    // 计算百分比
    const sum = useMemo(() => {
        let s = 0;
        stat.forEach(item => {
            s += item.count;
        });
        return s;
    }, [stat]);
    return <div style={{ width: "300px", height: "400px" }}>
        <ResponsiveContainer width="100%" height="100%">
            <PieChart>
                <Pie dataKey="count" data={stat} cx="50%" cy="50%" outerRadius={50} fill="#8884d8" label={i => `${i.name} ${(i.count / sum * 100).toFixed(2)}%}`}>
                    {
                        stat.map((item, index) => {
                            return <Cell key={index} fill={COLOR_LIST[index]} />;
                        })
                    }
                </Pie>
                <Tooltip />
            </PieChart>
        </ResponsiveContainer>
    </div>;
};

export default StatComponent;