import { FC, useEffect } from "react";
import { QuestionTitleProps } from "./interface";
import { Form, Input, Checkbox, Select } from "antd";
const PropComponent: FC<QuestionTitleProps> = (props: QuestionTitleProps) => {
    const { text, level, isCenter, onChange, disabled } = props;
    const [form] = Form.useForm();
    // 监听变化
    useEffect(() => {
        form.setFieldsValue({ text, level, isCenter });
    }, [text, level, isCenter]);
    // 值发生变化的方法
    const handleValueChange = () => {
        if (onChange) {
            onChange(form.getFieldsValue());
        }
    };
    return <Form
        layout="vertical"
        initialValues={{ text, level, isCenter }}
        form={form}
        onValuesChange={handleValueChange}
        disabled={disabled}
    >
        <Form.Item label="标题内容" name="text" rules={[{ required: true, message: "请输入标题内容" }]}>
            <Input />
        </Form.Item>
        <Form.Item label="层级" name="level">
            <Select options={[
                { value: 1, text: 1 },
                { value: 2, text: 2 },
                { value: 3, text: 3 },
            ]}>
            </Select>
        </Form.Item>
        <Form.Item name="isCenter" valuePropName="checked">
            <Checkbox>居中显示</Checkbox>
        </Form.Item>
    </Form>;
};

export default PropComponent;