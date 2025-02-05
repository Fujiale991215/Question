import { FC, useEffect } from "react";
import { QuestionInputProps } from "./interface";
import { Form, Input } from "antd";
const PropComponent: FC<QuestionInputProps> = (props: QuestionInputProps) => {
    const { title, placeholder, onChange, disabled } = props;
    const [form] = Form.useForm();
    // 监听变化
    useEffect(() => {
        form.setFieldsValue({ title, placeholder });
    }, [title, placeholder]);
    // 值发生变化的方法
    const handleValueChange = () => {
        if (onChange) {
            onChange(form.getFieldsValue());
        }
    };
    return <Form
        layout="vertical"
        initialValues={{ title, placeholder }}
        form={form}
        onValuesChange={handleValueChange}
        disabled={disabled}
    >
        <Form.Item label="标题" name="title" rules={[{ required: true, message: "请输入标题" }]}>
            <Input />
        </Form.Item>
        <Form.Item label="Placeholder" name="placeholder">
            <Input />
        </Form.Item>
    </Form>;
};

export default PropComponent;