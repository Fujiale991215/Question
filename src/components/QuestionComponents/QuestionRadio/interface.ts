export type OptionType = {
    value?: string,
    text?: string;
};


export type QuestionRadioProps = {
    /**
     * 问题标题
     */
    title?: string;
    /**
     * 是否竖向排列 
     */
    isVertical?: boolean;
    /**
     * 问题选项
     */
    options?: OptionType[];
    /**
     * 当前选中值
     */
    value?: string;
    /**
     * 选中值改变时触发
     */
    onChange?: (value: QuestionRadioProps) => void;
    /**
     * 是否禁用
     */
    disabled?: boolean;
};

export const QuestionDefaultProps: QuestionRadioProps = {
    title: '单选标题',
    isVertical: false,
    options: [
        { value: '1', text: '选项1' },
        { value: '2', text: '选项2' },
        { value: '3', text: '选项3' },
    ],
    value: '',
    onChange: () => { },
    disabled: false
};

// 统计组件的属性类型
export type QuestionRadioStatPropsType = {
    stat: Array<{ name: string, count: number; }>;
};