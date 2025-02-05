import { FC } from "react";
import type { QuestionInputProps } from "./QuestionInput/interface";
import type { QuestionParagraphProps } from "./QuestionParagraph/interface";
import type { QuestionTitleProps } from "./QuestionTitle/interface";
import type { QuestionInfoProps } from "./QuestionInfo/interface";
import type { QuestionTextareaProps } from "./QuestionTextarea/interface";
import type { QuestionRadioProps, QuestionRadioStatPropsType } from "./QuestionRadio/interface";
import type { QuestionCheckboxProps, QuestionCheckboxPropsType } from "./QuestionCheckbox/interface";
import QuestionInputConf from "../../components/QuestionComponents/QuestionInput";
import QuestionTitleConf from "../../components/QuestionComponents/QuestionTitle";
import QuestionParagraphConf from "../../components/QuestionComponents/QuestionParagraph";
import QuestionInfoConf from "../../components/QuestionComponents/QuestionInfo";
import QuestionTextareaConf from "../../components/QuestionComponents/QuestionTextarea";
import QuestionRadioConf from "../../components/QuestionComponents/QuestionRadio";
import QuestionCheckboxConf from "../../components/QuestionComponents/QuestionCheckbox";

// 组件的配置类型
export type ComponentProps = {
    cardId?: string,
    componentId?: string,
    componentTitle?: string;
    componentType?: string;
    componentProps?: questionComponentProps;
};

// 统一各个组件的统计属性类型
type ComponentStatPropsType = QuestionRadioStatPropsType & QuestionCheckboxPropsType;

// 统一,各个组件的prop type
export type questionComponentProps = ComponentProps & QuestionInputProps & QuestionTitleProps & QuestionParagraphProps & QuestionInfoProps & QuestionTextareaProps & QuestionRadioProps & QuestionCheckboxProps;

// 统一,组件的配置 type
export type ComponentConfType = {
    cardId?: string,
    componentId?: string,
    componentTitle: string;
    componentType: string;
    PropComponent: FC<questionComponentProps>,
    Component: FC<questionComponentProps>;
    componentProps: questionComponentProps;
    StatComponent?: FC<ComponentStatPropsType>;
};

// 全部的组件配置的列表
const componentConfList: ComponentConfType[] = [QuestionInputConf, QuestionTitleConf, QuestionParagraphConf, QuestionInfoConf, QuestionTextareaConf, QuestionRadioConf, QuestionCheckboxConf];

// 组件分组
export const componentConfiGroup = [
    {
        groupName: "文本显示",
        components: [QuestionInfoConf, QuestionTitleConf, QuestionParagraphConf]
    },
    {
        groupName: "用户输入",
        components: [QuestionInputConf, QuestionTextareaConf]
    },
    {
        groupName: "用户选择",
        components: [QuestionRadioConf, QuestionCheckboxConf]
    },
];


export function getComponentConfByType(type: string) {
    return componentConfList.find((item) => item.componentType === type);
}