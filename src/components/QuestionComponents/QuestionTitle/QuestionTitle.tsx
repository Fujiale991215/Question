

import { FC } from "react";
import { QuestionTotleDefaultProps } from "./interface";
import type { QuestionTitleProps } from "./interface";
import { Typography } from "antd";
const { Title } = Typography;
const QuestionTitle: FC<QuestionTitleProps> = (props: QuestionTitleProps) => {
    const { text = "", level = 1, isCenter = false, } = { ...QuestionTotleDefaultProps, ...props };
    // 判断字体大小
    const getFontSize = (level: number) => {
        if (level == 1) return "24px";
        if (level == 2) return "20px";
        if (level == 3) return "16px";
        return "16px";
    };
    return <Title level={level} style={{ textAlign: isCenter ? "center" : "start", marginBottom: "0", fontSize: getFontSize(level) }}>
        {text}
    </Title>
        ;
};

export default QuestionTitle;
