import React, { useState,useEffect } from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input, Checkbox } from 'antd';
import { useNavigate, Link } from 'react-router-dom';
import bgImage from "../../images/bg1.jpg";
import { GoogleOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from "react-redux";
import { clearError, SignupUser } from '../../Actions/UserAction';
import {useAlert} from "react-alert"
import Loader from "../Loader/Loader"

const Signup = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const alert=useAlert();

    const [agree, setAgree] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [avatar, setAvatar] = useState("");
    const [avatarPreview, setAvatarPreview] = useState("/Profile.png");

    const { error, loading, isAuthenticated } = useSelector(
        (state) => state.User
    );

    const handleSignUp = async () => {
        const formData = new FormData();
        formData.append('name', name);
        formData.append('email', email);
        formData.append('password', password);
        formData.append('avatar', avatar); 
        dispatch(SignupUser(formData));
    };
    useEffect(() => {
        if (error) {
          alert.error(error);
          dispatch(clearError());
        }
    
        if (isAuthenticated) {
          navigate("/account")
        }
      }, [dispatch, error, alert,isAuthenticated]);
    

    const onFinish = () => {
        handleSignUp();
    };

    const onAgreeChange = (e) => {
        setAgree(e.target.checked);
    };

    const handleAvatarChange = (e) => {
        const file = e.target.files[0];
    
        if (file) {
            setAvatar(file);
    
            // For displaying the preview, you can use FileReader
            const reader = new FileReader();
            reader.onload = () => {
                if (reader.readyState === 2) {
                    setAvatarPreview(reader.result);
                }
            };
            reader.readAsDataURL(file);
        } else {
            console.log("No file selected");
        }
    };
    

    return (
      <>
      {loading ? (<Loader/>) :
      (
        <div
        style={{ backgroundImage: `url(${bgImage})` }}
        className="flex items-center justify-center min-h-screen bg-cover bg-center p-12"
    >
        <div className="shadow-lg p-6 bg-white rounded-lg max-w-80 mt-8">
            <h5 className="text-center mb-4 font-normal">Create a new Notevault Account</h5>
            <Button type="default" icon={<GoogleOutlined />} className="mb-3 w-full">
                Sign up with Google
            </Button>
            <div className="flex items-center justify-center text-sm text-gray-600 mb-3">
                <hr className="flex-1" />
                <span className="mx-2">Or</span>
                <hr className="flex-1" />
            </div>
            <Form
                name="signup_form"
                initialValues={{ remember: true }}
                onFinish={onFinish}
                encType="multipart/form-data"
            >
                <Form.Item
                    name="name"
                    rules={[{ required: true, message: 'Please input your Name!' }]}
                >
                    <Input
                        prefix={<UserOutlined className="site-form-item-icon" />}
                        placeholder="Name"
                        name="name"
                        onChange={(e) => setName(e.target.value)}
                        className="rounded-md"
                    />
                </Form.Item>
                <Form.Item
                    name="email"
                    rules={[{ required: true, message: 'Please input your Email!' }]}
                >
                    <Input
                        prefix={<UserOutlined className="site-form-item-icon" />}
                        placeholder="Email"
                        name="email"
                        onChange={(e) => setEmail(e.target.value)}
                        className="rounded-md"
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
                        onChange={(e) => setPassword(e.target.value)}
                        className="rounded-md"
                    />
                </Form.Item>
                <Form.Item>
                    <div className="flex items-center justify-between">
                        <img src={avatarPreview} alt="Avatar Preview" className="w-18 h-14 rounded-full" />
                        <input
                            type="file"
                            name="avatar"
                            accept="image/*"
                            onChange={handleAvatarChange}
                            className="ml-4"
                        />
                    </div>
                </Form.Item>
                <Form.Item>
                    <Checkbox onChange={onAgreeChange} className="mb-1 text-sm text-gray-600">
                        I agree to the terms and conditions
                    </Checkbox>
                    <Checkbox className="text-sm text-gray-600">
                        Send me Tips and News.
                    </Checkbox>
                </Form.Item>
                <Form.Item>
                    <Button
                        type="primary"
                        htmlType="submit"
                        className="btn btn-primary w-full rounded-md"
                        disabled={!agree}
                    >
                        Sign up
                    </Button>
                </Form.Item>
                <div className="text-center mt-3">
                    <span className="font-normal">Already a member?</span>
                    <Link to="/login" className="text-blue-500 hover:underline ml-1">Login here!</Link>
                </div>
            </Form>
        </div>
    </div>
      )}
      </>
    );
};

export default Signup;
