

import { FC } from "react";
import { Typography, Input } from "antd";
import { QuestionDefaultProps,QuestionTextareaProps } from "./interface";
const { Paragraph } = Typography;
const { TextArea } = Input;
const QuestionTextarea: FC<QuestionTextareaProps> = (props: QuestionTextareaProps) => {
    const { title = "", placeholder = "" } = { ...QuestionDefaultProps, ...props };
    // 判断字体大小
    const getFontSize = (level: number) => {
        if (level == 1) return "24px";
        if (level == 2) return "20px";
        if (level == 3) return "16px";
        return "16px";
    };
    return <div>
        <Paragraph strong>{title}</Paragraph>
        <div>
            <TextArea placeholder={placeholder}></TextArea>
        </div>
    </div>;
};

export default QuestionTextarea;
