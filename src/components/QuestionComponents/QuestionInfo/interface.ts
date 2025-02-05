export type QuestionInfoProps = {
    /**
     * 标题 
     */
    title?: string,
    /**
     * 描述 
     */
    desc?: string,
    /**
     * 变化事件 
     */
    onChange?: (newProps: QuestionInfoProps) => void;
    /**
    * 禁用 
    */
    disabled?: boolean;
};

export const QuestionDefaultProps: QuestionInfoProps = {
    title: '问卷标题',
    desc: '问卷描述',
    onChange: () => { },
    disabled: false
};