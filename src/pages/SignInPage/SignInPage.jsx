import React from 'react';
import { Button, Form, Input } from 'antd';
import { useNavigate } from 'react-router-dom';
import './SignInPage.css';

const Login = () => {
  const navigate = useNavigate(); // Sử dụng hook useNavigate để điều hướng

  const onFinish = (values) => {
    console.log('Success:', values);
    navigate('/dashboard'); // Điều hướng đến trang Dashboard
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>ĐĂNG NHẬP</h2>
        <Form
          name="basic"
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          labelAlign="top"
          layout="vertical"
        >
          <Form.Item
            label="Tên đăng nhập"
            name="username"
            rules={[{ required: true, message: 'Vui lòng nhập tên đăng nhập!' }]}
          >
            <Input placeholder="Nhập tên đăng nhập" />
          </Form.Item>

          <Form.Item
            label="Mật khẩu"
            name="password"
            rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
          >
            <Input.Password placeholder="Nhập mật khẩu" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" className="login-button">
              Đăng nhập
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Login;
