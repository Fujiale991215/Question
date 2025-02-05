import { FC } from "react";
import { Typography } from "antd";
import { QuestionInfoProps, QuestionDefaultProps } from "./interface";
const { Title, Paragraph } = Typography;
const QuestionInfo: FC<QuestionInfoProps> = (props: QuestionInfoProps) => {
    // 解构
    const { title, desc = "", onChange, disabled } = { ...QuestionDefaultProps, ...props };
    // 换行
    const descList = desc.split("\n");
    return <div style={{ textAlign: "center" }}>
        <Title style={{ fontSize: "24px" }}>{title}</Title>
        <Paragraph>
            {descList.map((t, index) => <span key={index}>{index > 0 && <br />}{t}</span>)}
        </Paragraph>
    </div>;
};

export default QuestionInfo;