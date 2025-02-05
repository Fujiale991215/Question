import { FC } from "react";
import { Typography, Radio, Space } from "antd";
import { QuestionRadioProps, QuestionDefaultProps } from "./interface";
const { Title, Paragraph } = Typography;
const QuestionRadio: FC<QuestionRadioProps> = (props: QuestionRadioProps) => {
    // 解构
    const { title, isVertical, options = [], value } = { ...QuestionDefaultProps, ...props };
    return <div>
        <Paragraph strong>{title}</Paragraph>
        <Radio.Group value={value}>
            <Space direction={isVertical ? "vertical" : "horizontal"}>
                {options.map((opt: any) => {
                    const { value, text } = opt;
                    return <Radio value={value} key={value}>{text}</Radio>;
                })}
            </Space>
        </Radio.Group>
    </div>;
};

export default QuestionRadio;