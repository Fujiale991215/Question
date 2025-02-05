import { FC, useEffect } from "react";
import { Form, Input, Checkbox, Select, Button, Space } from "antd";
import { QuestionRadioProps, OptionType } from "./interface";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
// 导入 nanoid  
import { customAlphabet } from "nanoid";
const numbers = '0123456789';
const nanoid = customAlphabet(numbers, 8);
const PropComponent: FC<QuestionRadioProps> = (props: QuestionRadioProps) => {
    // 解构
    const { title, value, options = [], isVertical, onChange, disabled } = props;
    const [form] = Form.useForm();
    useEffect(() => {
        form.setFieldsValue({ title, value, options, isVertical });
    }, [title, value, options, isVertical]);
    // 表单变化
    const handleValueChange = () => {
        if (!onChange) return;
        const newValues = form.getFieldsValue() as QuestionRadioProps;
        if (newValues.options) {
            newValues.options = newValues.options.filter((opt: OptionType) => !(opt.text == null));
        }
        const { options = [] } = newValues;
        options.forEach((opt: OptionType) => {
            if (opt.value) return;
            opt.value = nanoid(5);
        });
        onChange(newValues);
    };
    return <Form
        form={form}
        layout="vertical"
        initialValues={{ title, value, options, isVertical }}
        onValuesChange={handleValueChange}
        disabled={disabled}
    >
        <Form.Item label="标题" name="title" rules={[{ required: true, message: '请输入标题' }]} >
            <Input></Input>
        </Form.Item>
        <Form.Item label="选项">
            <Form.List name="options">
                {(fields, { add, remove }) => (<>
                    {fields.map(({ key, name }, index) => {
                        return <Space key={key} align="baseline">
                            <Form.Item name={[name, 'text']} rules={[{ required: true, message: "请输入选项文字" }, {
                                validator: (_, text) => {
                                    const { options = [] } = form.getFieldsValue();
                                    let num = 0;
                                    options.forEach((opt: OptionType) => {
                                        if (opt.text === text) num++; //记录text相同的个数,预期只能有一个
                                    });
                                    if (num == 1) return Promise.resolve();
                                    return Promise.reject(new Error("选项文字不能重复"));
                                }
                            }]}>
                                <Input placeholder="请输入选项文字" />
                            </Form.Item>
                            {index > 1 && <MinusCircleOutlined onClick={() => remove(name)} />}
                        </Space>;
                    })}
                    <Form.Item>
                        <Button type="link" onClick={() => add({ text: "", value: "" })} icon={<PlusOutlined />} block>添加选项</Button>
                    </Form.Item>
                </>)}
            </Form.List>
        </Form.Item>
        <Form.Item label="默认选中" name="value">
            <Select value={value} options={options.map(({ text, value }) => ({ value, label: text || "" }))}></Select>
        </Form.Item>
        <Form.Item name="isVertical" valuePropName="checked">
            <Checkbox>竖向排列</Checkbox>
        </Form.Item>
    </Form>;
};

export default PropComponent;