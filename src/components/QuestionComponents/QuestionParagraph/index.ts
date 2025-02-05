import Component from "./QuestionParagraph";
import { QuestionParagraphDefaultProps } from "./interface";
import PropComponent from "./PropComponent";
export * from './interface';

export default {
    componentTitle: "输入框",
    componentType: "questionParagraph",
    Component, //画布显示的组件
    PropComponent, //修改组件属性时显示的组件
    componentProps: QuestionParagraphDefaultProps
};