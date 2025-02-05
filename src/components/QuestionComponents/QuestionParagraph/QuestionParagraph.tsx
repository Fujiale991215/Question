import { FC } from "react";
import type { QuestionParagraphProps } from "./interface";
import { QuestionParagraphDefaultProps } from "./interface";
import { Typography } from "antd";
const { Paragraph } = Typography;
const QuestionParagraph: FC<QuestionParagraphProps> = (props: QuestionParagraphProps) => {
    // 解构默认属性
    const { text = "", isCenter = false, disabled } = { ...QuestionParagraphDefaultProps, ...props };
    // 处理换行
    const textList = text.split("\n");
    return <Paragraph style={{ textAlign: isCenter ? 'center' : 'start', marginBottom: '0' }}>
        {textList.map((t, index) => <span key={index}>{index > 0 && <br />}{t}</span>)}
    </Paragraph>;
};


export default QuestionParagraph;