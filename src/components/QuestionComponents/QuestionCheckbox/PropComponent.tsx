import { FC, useEffect } from "react";
import { Form, Input, Checkbox, Select, Button, Space } from "antd";
import { QuestionCheckboxProps, OptionType } from "./interface";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
// 导入 nanoid  
import { customAlphabet } from "nanoid";
const numbers = '0123456789';
const nanoid = customAlphabet(numbers, 8);
const PropComponent: FC<QuestionCheckboxProps> = (props: QuestionCheckboxProps) => {
    // 解构
    const { title, list = [], isVertical, onChange, disabled } = props;
    const [form] = Form.useForm();
    useEffect(() => {
        form.setFieldsValue({ title, list, isVertical });
    }, [title, list, isVertical]);
    // 表单变化
    const handleValueChange = () => {
        if (!onChange) return;
        const newValues = form.getFieldsValue() as QuestionCheckboxProps;
        if (newValues.list) {
            newValues.list = newValues.list.filter((opt: OptionType) => !(opt.text == null));
        }
        const { list = [] } = newValues;
        list.forEach((opt: OptionType) => {
            if (opt.value) return;
            opt.value = nanoid(5);
        });
        onChange(newValues);
    };
    return <Form
        form={form}
        layout="vertical"
        initialValues={{ title, list, isVertical }}
        onValuesChange={handleValueChange}
        disabled={disabled}
    >
        <Form.Item label="标题" name="title" rules={[{ required: true, message: '请输入标题' }]} >
            <Input></Input>
        </Form.Item>
        <Form.Item label="选项">
            <Form.List name="list">
                {(fields, { add, remove }) => (<>
                    {fields.map(({ key, name }, index) => {
                        return <Space key={key} align="baseline">
                            <Form.Item name={[name, 'checked']} valuePropName="checked">
                                <Checkbox />
                            </Form.Item>
                            <Form.Item name={[name, 'text']} rules={[{ required: true, message: "请输入选项文字" }, {
                                validator: (_, text) => {
                                    const { list = [] } = form.getFieldsValue();
                                    let num = 0;
                                    list.forEach((opt: OptionType) => {
                                        if (opt.text === text) num++; //记录text相同的个数,预期只能有一个
                                    });
                                    if (num == 1) return Promise.resolve();
                                    return Promise.reject(new Error("选项文字不能重复"));
                                }
                            }]}>
                                <Input placeholder="请输入选项文字" />
                            </Form.Item>
                            {index > 0 && <MinusCircleOutlined onClick={() => remove(name)} />}
                        </Space>;
                    })}
                    <Form.Item>
                        <Button type="link" onClick={() => add({ text: "", value: "", checked: false })} icon={<PlusOutlined />} block>添加选项</Button>
                    </Form.Item>
                </>)}
            </Form.List>
        </Form.Item>
        <Form.Item name="isVertical" valuePropName="checked">
            <Checkbox>竖向排列</Checkbox>
        </Form.Item>
    </Form>;
};

export default PropComponent;