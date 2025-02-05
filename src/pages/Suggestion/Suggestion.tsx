import { FC, useState } from "react";
import { Form, Typography, Input, Flex, Rate, Button, Checkbox, Space, message } from "antd";
import { FrownOutlined, MehOutlined, SmileOutlined } from '@ant-design/icons';
import { saveSuggestion } from "../../server/Suggestion";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
const { TextArea } = Input;
const { Title } = Typography;
import "./scss/suggestion.scss";
const Suggestion: FC = () => {
    // 导航
    const nav = useNavigate();
    // 分数
    const [score, setScore] = useState(3);
    // 态度
    const [attitude, setAttitude] = useState(3);
    // 禁用姓名
    const [disabled, setDisabled] = useState(true);
    // 打分排行
    const customIcons: Record<number, React.ReactNode> = {
        1: <FrownOutlined />,
        2: <FrownOutlined />,
        3: <MehOutlined />,
        4: <SmileOutlined />,
        5: <SmileOutlined />,
    };
    // 表单hook
    const [form] = Form.useForm();
    // 表单完成事件
    const onFinish = async ({ name = "", suggestion = "", contact = "" }) => {
        const data = {
            name: disabled ? "" : name,
            suggestion,
            score,
            attitude,
            createTime: dayjs().format("YYYY-MM-DD HH:mm:ss")
        };
        const res = await saveSuggestion(data);
        if (res.code === 200) {
            message.success("提交成功");
            nav(-1);
        }
    };
    // 打分器发生变化的毁掉
    const onChange = (value: number) => {
        setScore(value);
    };
    // 态度发生变化的回调
    const onAttitudeChange = (value: number) => {
        setAttitude(value);
    };
    return <div className="sug-wrapper">
        <Title style={{ color: "#fff", width: "100%" }} level={2}>欢迎您对我们提出指正</Title>
        <div className="sug-textarea">
            <Form
                form={form}
                onFinish={onFinish}
            >
                <Form.Item name="suggestion" label="您的建议" rules={[{ required: true, message: "请输入您的建议" }]}>
                    <TextArea placeholder="请输入您的建议" style={{ height: "400px" }} />
                </Form.Item>
                <Form.Item name="contact" label="联系方式">
                    <Input placeholder="请输入您的联系方式" />
                </Form.Item>
                <Space>
                    <Form.Item name="name">
                        <Input disabled={disabled} placeholder="请输入您的姓名" />
                    </Form.Item>
                    <Form.Item>
                        <Checkbox onChange={(e) => { setDisabled(!e.target.checked); }}></Checkbox>
                        是否愿意留下您的姓名
                    </Form.Item>
                </Space>
                <Form.Item>
                    <Flex gap="middle" vertical>
                        <Rate onChange={onChange} style={{ color: "#ffd111", fontSize: "40px" }} defaultValue={score} character={({ index = 0 }) => index + 1} />
                        <Rate onChange={onAttitudeChange} style={{ fontSize: "40px" }} defaultValue={attitude} character={({ index = 0 }) => customIcons[index + 1]} />
                        <div style={{ color: "#fff", fontSize: "26px" }}>请为我们打分,您的建议将帮助我们改进我们的产品</div>
                    </Flex>
                </Form.Item>
                <Form.Item>
                    <Space>
                        <Button type="primary" htmlType="submit">提交</Button>
                        <Button onClick={() => nav(-1)}>返回</Button>
                    </Space>
                </Form.Item>
            </Form>
        </div>
    </div>;
};
export default Suggestion;