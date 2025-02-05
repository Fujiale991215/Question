

import { FC } from "react";
import { Typography, Input } from "antd";
import { QuestionDefaultProps } from "./interface";
import type { QuestionInputProps } from "./interface";
const { Paragraph } = Typography;
const QuestionInput: FC<QuestionInputProps> = (props: QuestionInputProps) => {
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
            <Input placeholder={placeholder}></Input>
        </div>
    </div>;
};

export default QuestionInput;
