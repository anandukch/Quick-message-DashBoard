import { Button, Form, Input } from "antd";
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../apis/auth";
import Notification from "../functions/notification";
import { AppDispatch } from "../store";
import { login as loginReducer } from "../store/auth/authSlice";

function LoginForm() {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const onFinish = async (values: { username: string; password: string }) => {
        login(values.username, values.password)
            .then((res) => {
                dispatch(loginReducer(res.data));
                // dispatch({
                //     type: "auth/login",
                //     payload: {
                //         isAuthenticated: true,
                //         token: res.data.token,
                //     },
                // });
                // localStorage.setItem("token", res.data.token);
                navigate("/home");
            })
            .catch((err) => {
                console.error(err);

                Notification("Login failed", false);
            });
    };

    const onFinishFailed = (errorInfo: any) => {
        console.error("Failed:", errorInfo);
    };

    return (
        <Form
            name="basic"
            labelCol={{ span: 10 }}
            wrapperCol={{ span: 15 }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            style={{
                margin: "auto",
                width: "700px",
                backgroundColor: "rgb(173 173 173)",
                marginTop: "100px",
                padding: "50px",
                alignItems: "center",
                borderRadius: "10px",
            }}
        >
            <Form.Item
                label="Username"
                name="username"
                rules={[
                    { required: true, message: "Please input your username!" },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Password"
                name="password"
                rules={[
                    { required: true, message: "Please input your password!" },
                ]}
            >
                <Input.Password />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
    );
}

export default LoginForm;
