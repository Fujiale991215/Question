export type QuestionParagraphProps = {
    /**
     * 文本属性 
     */
    text?: string;
    /**
     * 是否居中 
     */
    isCenter?: boolean;
    /**
   * 变化事件 
   */
    onChange?: (newProps: QuestionParagraphProps) => void;
    /**
    * 禁用 
    */
    disabled?: boolean;
};


export const QuestionParagraphDefaultProps: QuestionParagraphProps = {
    text: '一行段落',
    isCenter: false,
};