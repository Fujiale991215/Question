export type QuestionTextareaProps = {
    /**
     * 标题 
     */
    title?: string;
    /**
     * 提示符 
     */
    placeholder?: string;
    /**
     * 组件ID 
     */
    componentId?: string;
    /**
     * 变化事件 
     */
    onChange?: (newProps: QuestionTextareaProps) => void;
     /**
     * 禁用 
     */
     disabled?: boolean;
};

export const QuestionDefaultProps: QuestionTextareaProps = {
    title: '输入框标题',
    placeholder: '请输入...'
};