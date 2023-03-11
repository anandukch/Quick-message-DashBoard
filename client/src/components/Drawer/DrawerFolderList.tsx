import { FolderFilled } from "@ant-design/icons";
import { Button, List, Popconfirm, Spin, Typography } from "antd";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getFolders } from "../../apis/folder";

function DrawerFolderList(props: any) {
    const { onClicked } = props;
    const [folders, setFolders] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            getFolders()
                .then((res) => {
                    setFolders(res.data);
                    setLoading(false);
                })
                .catch((err) => {
                    console.log(err.response);
                    if (err.response.status === 401) {
                        localStorage.removeItem("token");
                        navigate("/login");
                    }
                });
        };
        fetchData();
    }, [navigate]);
    return (
        <List
            dataSource={folders}
            renderItem={(item, i) => (
                <Spin spinning={loading}>
                    <List.Item
                        key={i}
                        onClick={() => {
                            onClicked(item.id);
                        }}
                        style={{
                            cursor: "pointer",
                        }}
                    >
                        <FolderFilled style={{ fontSize: "500%" }} />
                        <Typography.Text
                            style={{
                                marginRight: "70%",
                                fontSize: "17px",
                                color: "white",
                            }}
                        >
                            {item.name}
                        </Typography.Text>
                    </List.Item>
                </Spin>
            )}
        />
    );
}

export default DrawerFolderList;
