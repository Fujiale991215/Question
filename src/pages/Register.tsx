import React, { FC, useEffect, useState } from "react";
import { Typography, Space, Button, Form, Input, message, Modal } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { UserAddOutlined } from "@ant-design/icons";
import "./scss/Register.scss";
import { LOGIN_PATHNAME } from "../router/index";
import { register } from "../server/login/index";
const { Title } = Typography;
const Register: FC = () => {
    const nav = useNavigate();
    // 设置loading效果
    const [loading, setLoading] = useState(false);
    // 设置提示框显示
    const [open, setOpen] = useState(false);
    // 自动跳转登录页
    const [second, setSecond] = useState(10);
    // 提交成功按钮
    const onFinish = async (val: any) => {
        const { userName, passWord, nickName } = val;
        let data = { userName, passWord, nickName };
        setLoading(true);
        const res = await register(data);
        if (res.code === 200) {
            message.success("注册成功");
            setOpen(true);
            setLoading(false);
            timeout();
        } else {
            message.error(res.msg);
            setLoading(false);
        }
        setLoading(false);
    };
    // 手动跳转登录页
    const handleOk = () => {
        nav(LOGIN_PATHNAME);
        setOpen(false);
        setLoading(false);
    };
    // 取消跳转登录页
    const handleCancel = () => {
        setSecond(10);
        setOpen(false);
        setLoading(false);
    };
    // 定时器调用的函数
    const timeout = () => {
        const intervalId = setInterval(() => {
            setSecond((second) => {
                if (second === 1) {
                    clearInterval(intervalId);
                    nav(LOGIN_PATHNAME);
                    return 0; // 结束时返回 0
                }
                return second - 1; // 每秒减少 1
            });
        }, 1000);

        // 清理定时器
        return () => clearInterval(intervalId);
    };
    return (
        <div className="register-container">
            <div>
                <Space>
                    <Title level={2}>
                        <UserAddOutlined />
                    </Title>
                    <Title level={2}>注册新用户</Title>
                </Space>
            </div>
            <div>
                <Form labelCol={{ span: 6 }} wrapperCol={{ span: 16 }} onFinish={onFinish}>
                    <Form.Item
                        label="用户名"
                        name="userName"
                        rules={[
                            { required: true, message: "请输入用户名" },
                            { type: "string", min: 3, max: 10, message: "用户名长度在3-10之间" },
                            { pattern: /^\w+$/, message: "用户名只能包含数字字母下划线" },
                        ]}
                    >
                        <Input placeholder="请输入账号" />
                    </Form.Item>
                    <Form.Item label="密码" name="passWord" rules={[{ required: true, message: "请输入密码" }]}>
                        <Input.Password placeholder="请输入密码" />
                    </Form.Item>
                    <Form.Item
                        label="确认密码"
                        name="confirm"
                        dependencies={["passWord"]}
                        rules={[
                            { required: true, message: "请输入密码" },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue("passWord") === value) {
                                        return Promise.resolve();
                                    } else {
                                        return Promise.reject(new Error("两次密码不一致"));
                                    }
                                },
                            }),
                        ]}
                    >
                        <Input.Password placeholder="请确认密码" />
                    </Form.Item>
                    <Form.Item label="昵称" name="nickName" rules={[{ required: true, message: "请输入昵称" }]}>
                        <Input placeholder="请输入昵称" />
                    </Form.Item>
                    <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
                        <Space>
                            <Button type="primary" htmlType="submit" disabled={loading}>
                                注册
                            </Button>
                            <Link to={LOGIN_PATHNAME}>已有账号,去登录</Link>
                        </Space>
                    </Form.Item>
                </Form>
            </div>
            <Modal open={open} centered closable={false} maskClosable={false} onOk={handleOk} onCancel={handleCancel} cancelText={"取消"} okText={"确定"}>
                <div style={{ textAlign: "center", height: "200px", lineHeight: "200px", fontSize: "20px", fontWeight: "bold", color: "#216c83" }}>
                    注册成功, <p style={{ color: "#d08528", display: "inline" }}>{second}</p> 秒后跳转至登录页
                </div>
            </Modal>
        </div>
    );
};

export default Register;
