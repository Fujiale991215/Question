import { FC, forwardRef, useEffect, useImperativeHandle } from "react";
import { Button, Form, Input } from "antd";
import { useDispatch } from "react-redux";
import useGetPageInfo from "../../../hooks/getPageInfo";
import { resetPageInfo } from "../../store/pageInfo";
const { TextArea } = Input;
const PageSetting: FC<any> = forwardRef((prop, ref) => {
    // 派发请求
    const dispatch = useDispatch();
    // 获取页面信息
    const pageInfo = useGetPageInfo();
    // 获取表单实例
    const [form] = Form.useForm();
    // 监听表单变化
    useEffect(() => {
        form.setFieldsValue(pageInfo);
    }, [pageInfo]);
    // 表单值改变
    const handleValuesChange = () => {
        dispatch(resetPageInfo(form.getFieldsValue()));
    };
    const handleClick = () => {
        const res = form.validateFields();
        return res;
    };
    useImperativeHandle(ref, () => ({
        handleClick,
    }));
    return <Form
        layout="vertical"
        initialValues={pageInfo}
        form={form}
        onValuesChange={handleValuesChange}
    >
        <Form.Item label="问卷标题" name="title" rules={[{ required: true, message: '请输入页面标题' }]}>
            <Input placeholder="请输入标题" />
        </Form.Item>
        <Form.Item label="问卷描述" name="desc">
            <TextArea placeholder="请输入描述" />
        </Form.Item>
        <Form.Item label="脚本代码" name="js">
            <TextArea placeholder="请输入脚本代码" />
        </Form.Item>
        <Form.Item label="样式代码" name="css">
            <TextArea placeholder="请输入css样式代码" />
        </Form.Item>
        <Form.Item>
            <Button onClick={handleClick}>提交</Button>
        </Form.Item>
    </Form>;
});

export default PageSetting;