import React, { useState, useEffect } from 'react';
import { LockOutlined, UserOutlined, GoogleOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { clearError, LoginUser } from '../../Actions/UserAction';
import bgImage from "../../images/bg1.jpg";
import { useAlert } from 'react-alert';
import Loader from '../Loader/Loader';

const Login = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();


  
  const { error, loading, isAuthenticated } = useSelector(
    (state) => state.User
  );
 

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearError());
    }

    if (isAuthenticated) {
      navigate("/account");
    }
  }, [dispatch, error, alert, navigate, isAuthenticated]);

  const handleLogin = () => {
    dispatch(LoginUser(loginEmail, loginPassword));
  };

  const onFinish = () => {
    handleLogin();
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div
          style={{ backgroundImage: `url(${bgImage})` }}
          className="flex items-center justify-center min-h-screen bg-cover bg-center"
        >
          <div className="card shadow-lg p-6 mt-4 rounded-md bg-white" style={{ maxWidth: '23rem' }}>
            <h5 className="text-center mb-4 font-normal">Login</h5>
            <Button type="default" icon={<GoogleOutlined />} className="ml-5 mb-3 max-w-screen-2xl">
              Sign up with Google
            </Button>
            <div className="text-center flex items-center justify-center text-sm" style={{ color: "rgba(102, 102, 104,4)" }}>
              <hr className="left-line" style={{ flex: 1 }} />
              <span style={{ margin: "2px 8px" }}>Or</span>
              <hr className="right-line" style={{ flex: 1 }} />
            </div>
            <Form
              name="normal_login"
              initialValues={{ remember: true }}
              onFinish={onFinish}
            >
              <Form.Item
                name="email"
                rules={[{ required: true, message: 'Please input your Email!' }]}
              >
                <Input
                  prefix={<UserOutlined className="site-form-item-icon" />}
                  placeholder="Email"
                  name="email"
                  onChange={(e) => setLoginEmail(e.target.value)}
                />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[{ required: true, message: 'Please input your Password!' }]}
              >
                <Input
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  type="password"
                  placeholder="Password"
                  name="password"
                  onChange={(e) => setLoginPassword(e.target.value)}
                />
              </Form.Item>
              <Form.Item>
                <div className="d-flex justify-content-between align-items-center">
                  <Form.Item name="remember" valuePropName="checked" noStyle>
                    <Checkbox>Remember me</Checkbox>
                  </Form.Item>
                  <Link className="login-form-forgot text-blue-500 hover:underline" to="/forgotpassword">
                    Forgot password
                  </Link>
                </div>
              </Form.Item>
              <Form.Item>
                <Button 
                  type="primary" 
                  htmlType="submit" 
                  className="w-full"
                >
                  Log in
                </Button>
                <div className="mt-3 text-center">
                  Not a member? <Link className="text-blue-500 hover:underline" to="/signup">Register now!</Link>
                </div>
              </Form.Item>
            </Form>
          </div>
        </div>
      )}
    </>
  );
};

export default Login;
