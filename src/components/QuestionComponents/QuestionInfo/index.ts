
import Component from './QuestionInfo';
import { QuestionDefaultProps } from './interface';

export * from "./interface";
import PropComponent from './PropComponent';
// Input的配置
export default {
    componentTitle: "问卷信息",
    componentType: "questionInfo",
    Component, //画布显示的组件
    PropComponent, //修改组件属性时显示的组件
    componentProps: QuestionDefaultProps
};