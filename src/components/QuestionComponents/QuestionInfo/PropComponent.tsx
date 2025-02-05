import { FC, useEffect } from "react";
import { Form, Input } from "antd";
import { QuestionInfoProps } from "./interface";
const { TextArea } = Input;
const PropComponent: FC<QuestionInfoProps> = (props: QuestionInfoProps) => {
    // 解构
    const { title, desc, onChange, disabled } = props;
    const [form] = Form.useForm();
    useEffect(() => {
        form.setFieldsValue({ title, desc });
    }, [title, desc]);
    // 表单变化
    const handleValueChange = () => {
        if (onChange) {
            onChange(form.getFieldsValue());
        }
    };
    return <Form
        form={form}
        layout="vertical"
        initialValues={{ title, desc }}
        disabled={disabled}
        onValuesChange={handleValueChange}
    >
        <Form.Item label="标题" name="title" rules={[{ required: true, message: '请输入标题' }]} >
            <Input></Input>
        </Form.Item>
        <Form.Item label="描述" name="desc">
            <TextArea />
        </Form.Item>
    </Form>;
};

export default PropComponent;