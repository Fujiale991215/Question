export type QuestionTitleProps = {
    /**
     * 文本
     */
    text?: string;
    /**
     * 级别
     */
    level?: 1 | 2 | 3 | 4 | 5;
    /**
     * 是否居中
     */
    isCenter?: boolean;
    /**
     * 变化事件 
     */
    onChange?: (newProps: QuestionTitleProps) => void;
    /**
     * 禁用 
     */
    disabled?: boolean;
};

export const QuestionTotleDefaultProps: QuestionTitleProps = {
    text: '一行标题',
    level: 1,
    isCenter: false,
};