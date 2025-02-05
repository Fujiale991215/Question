
import Component from './QuestionRadio';
import { QuestionDefaultProps } from './interface';
import StatComponent from './StatComponent';
export * from "./interface";
import PropComponent from './PropComponent';
// Input的配置
export default {
    componentTitle: "单选",
    componentType: "questionRadio",
    Component, //画布显示的组件
    PropComponent, //修改组件属性时显示的组件
    componentProps: QuestionDefaultProps,
    StatComponent // 统计组件
};