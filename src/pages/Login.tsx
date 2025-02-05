import React, { FC, useEffect, useState } from "react";
import { Button, Form, Input, message, Space, Typography, Checkbox } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { UserAddOutlined } from "@ant-design/icons";
import "./scss/Login.scss";
import { REGISTER_PATHNAME } from "../router/index";
import { login } from "../server/login/index";
import { useDispatch } from "react-redux";
import { setUserInfo } from "../pages/store/user";
const { Title } = Typography;

// 本地存储用户名KEY
const USER_NAME_KEY = "USER_NAME_KEY";
// 本地存储密码KEY
const PASS_WORD_KEY = "PASS_WORD_KEY";
/** 记住用户名密码函数 */
const rememberUser = (userName: string, passWord: string) => {
    localStorage.setItem(USER_NAME_KEY, userName);
    localStorage.setItem(PASS_WORD_KEY, passWord);
};
/** 忘记用户名密码函数 */
const forgetUser = () => {
    localStorage.removeItem(USER_NAME_KEY);
    localStorage.removeItem(PASS_WORD_KEY);
};
/** 获取用户名密码函数 */
const getUser = () => {
    const userName = localStorage.getItem(USER_NAME_KEY);
    const passWord = localStorage.getItem(PASS_WORD_KEY);
    return {
        userName,
        passWord,
    };
};
const Login: FC = () => {
    // 派发请求
    const dispatch = useDispatch();
    // 路由跳转方法
    const nav = useNavigate();
    // 表单hook
    const [form] = Form.useForm();
    // 生命周期函数
    useEffect(() => {
        const { userName, passWord } = getUser();
        form.setFieldsValue({ userName, passWord });
    }, []);
    // 提交登录按钮
    const onFinish = async (val: any) => {
        const { userName, passWord, remember } = val;
        if (remember) {
            rememberUser(userName, passWord);
        } else {
            forgetUser();
        }
        const res = await login({ userName, passWord });
        if (res.code == 200) {
            dispatch(setUserInfo(res.data.userInfo));
            localStorage.setItem("question_access_token", res.data.accessToken);
            localStorage.setItem("question_refreshToken_token", res.data.refreshToken);
            localStorage.setItem("question_userInfo", JSON.stringify(res.data.userInfo));
            nav("/manage/list");
        }
    };
    return (
        <div className="login-container">
            <div>
                <Space>
                    <Title level={2}>
                        <UserAddOutlined />
                    </Title>
                    <Title level={2}>用户登录</Title>
                </Space>
            </div>
            <div>
                <Form labelCol={{ span: 6 }} wrapperCol={{ span: 20 }} onFinish={onFinish} form={form} initialValues={{ remember: true }}>
                    <Form.Item label="用户名" name="userName" rules={[{ required: true, message: "请输入用户名" }]}>
                        <Input placeholder="请输入账号" />
                    </Form.Item>
                    <Form.Item label="密码" name="passWord" rules={[{ required: true, message: "请输入密码" }]}>
                        <Input.Password placeholder="请输入密码" />
                    </Form.Item>
                    <Form.Item wrapperCol={{ offset: 6, span: 16 }} name="remember" valuePropName="checked">
                        <Checkbox>记住我</Checkbox>
                    </Form.Item>
                    <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
                        <Space>
                            <Button type="primary" htmlType="submit">
                                登陆
                            </Button>
                            <Link to={REGISTER_PATHNAME}>注册新用户</Link>
                        </Space>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
};

export default Login;
