import { FC, useEffect } from "react";
import { QuestionParagraphProps } from "./interface";
import { Checkbox, Form, Input } from "antd";
const { TextArea } = Input;
const PropComponent: FC<QuestionParagraphProps> = (props: QuestionParagraphProps) => {
    // 解构默认数据
    const { text, isCenter, disabled, onChange } = props;
    // 获取表单数据
    const [form] = Form.useForm();
    useEffect(() => {
        form.setFieldsValue({ text, isCenter });
    }, [text, isCenter]);
    // 监听表单变化
    const handleFormChange = () => {
        if (onChange) {
            onChange(form.getFieldsValue());
        }
    };

    return <Form
        layout="vertical"
        initialValues={{ text, isCenter }}
        form={form}
        disabled={disabled}
        onValuesChange={handleFormChange}
    >
        <Form.Item label="段落内容" name="text" rules={[{ required: true, message: "请输入段落" }]}>
            <TextArea />
        </Form.Item>
        <Form.Item name="isCenter" valuePropName="checked">
            <Checkbox>居中显示</Checkbox>
        </Form.Item>
    </Form>;
};

export default PropComponent;