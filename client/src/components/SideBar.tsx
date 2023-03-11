import {
    DatabaseFilled,
    HomeFilled,
    LoginOutlined,
    PlusSquareFilled,
} from "@ant-design/icons";
import { Menu, Typography } from "antd";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { logOut } from "../store/auth/authSlice";

const keys: { [index: string]: { item: string } } = {
    "": { item: "home" },
    login: {
        item: "login",
    },
    home: {
        item: "home",
    },
    folders: {
        item: "folders",
    },
    campaigns: {
        item: "campaigns",
    },
};

function SideBar() {
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const dispatch = useDispatch();
    const logoutHandler = () => {
        dispatch(logOut());
        navigate("/login");
    };
    const { item } = keys[pathname.split("/")[1]];
    return (
        <div>
            <Menu
                mode="inline"
                theme="dark"
                selectedKeys={[item]}
                style={{
                    display: pathname === "/login" ? "none" : "",
                    maxWidth: 225,
                    height: "100vh",
                    position: "fixed",
                    top: 0,
                    overflow: "hidden auto",
                }}
            >
                <Typography.Title
                    level={1}
                    style={{
                        color: "white",
                        fontWeight: "bold",
                        marginBottom: 50,
                    }}
                >
                    Quick Message
                </Typography.Title>
                <Menu.Item key="home" icon={<HomeFilled />}>
                    <NavLink to="/home">Campaigns</NavLink>
                </Menu.Item>
                <Menu.Item key="campaigns" icon={<PlusSquareFilled />}>
                    <NavLink to="/campaigns">Create Campaigns</NavLink>
                </Menu.Item>
                <Menu.Item key="folders" icon={<DatabaseFilled />}>
                    <NavLink to="/folders">Content</NavLink>
                </Menu.Item>
                <Menu.Item
                    key="logout"
                    icon={<LoginOutlined />}
                    onClick={logoutHandler}
                >
                    Logout
                </Menu.Item>
            </Menu>
        </div>
    );
}

export default SideBar;
