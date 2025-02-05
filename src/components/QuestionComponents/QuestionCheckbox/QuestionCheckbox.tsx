import { FC } from "react";
import { Typography, Checkbox, Space } from "antd";
import { QuestionCheckboxProps, QuestionDefaultProps } from "./interface";
const { Title, Paragraph } = Typography;
const QuestionCheckbox: FC<QuestionCheckboxProps> = (props: QuestionCheckboxProps) => {
    // 解构
    const { title, isVertical, list = [] } = { ...QuestionDefaultProps, ...props };
    return <div>
        <Paragraph strong>{title}</Paragraph>
        <Space direction={isVertical ? "vertical" : "horizontal"}>
            {list.map((opt: any) => {
                const { value, text, checked } = opt;
                return <Checkbox value={value} key={value} checked={checked}>{text}</Checkbox>;
            })}
        </Space>
    </div>;
};

export default QuestionCheckbox;