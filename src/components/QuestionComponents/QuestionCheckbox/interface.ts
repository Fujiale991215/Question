export type OptionType = {
    value?: string,
    text?: string;
    checked?: boolean;
};


export type QuestionCheckboxProps = {
    /**
     * 问题标题
     */
    title?: string;
    /**
     * 是否竖向排列 
     */
    isVertical?: boolean;
    /**
     * 问题类型
     */
    list?: OptionType[];
    /**
     * 选中值改变时触发
     */
    onChange?: (value: QuestionCheckboxProps) => void;
    /**
     * 是否禁用
     */
    disabled?: boolean;
};

export const QuestionDefaultProps: QuestionCheckboxProps = {
    title: '多选标题',
    isVertical: false,
    list: [
        { value: '1', text: '选项1', checked: false },
        { value: '2', text: '选项2', checked: false },
        { value: '3', text: '选项3', checked: false },
    ],
    onChange: () => { },
    disabled: false
};

// 多选组件的类型
export type QuestionCheckboxPropsType = {
    stat: Array<{ name: string, count: number; }>;
};