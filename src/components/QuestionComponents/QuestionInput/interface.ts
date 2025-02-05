export type QuestionInputProps = {
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
    onChange?: (newProps: QuestionInputProps) => void;
     /**
     * 禁用 
     */
     disabled?: boolean;
};

export const QuestionDefaultProps: QuestionInputProps = {
    title: '输入框标题',
    placeholder: '请输入...'
};