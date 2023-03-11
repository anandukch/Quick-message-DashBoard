import { FolderFilled } from "@ant-design/icons";
import { Button, Card, Divider, Layout, List, Spin, Typography } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createFolder, getFolders } from "../../apis/folder";
import FolderModal from "../../components/FolderModal";
import Notification from "../../functions/notification";

function FolderList() {
    const navigate = useNavigate();
    const [folders, setFolders] = useState<any[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const createFolderHandler = async (folderName: string) => {
        setLoading(true);
        createFolder(folderName)
            .then((res) => {
                setFolders([...folders, { name: folderName }]);
                setLoading(false);
                Notification("Folder created successfully", true);
            })
            .catch(() => {
                setLoading(false);
                Notification("Folder creation failed", false);
            });
    };

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            getFolders()
                .then((res) => {
                    setFolders(res.data);
                    setLoading(false);
                })
                .catch((err) => {
                    if (err.response.status === 401) {
                        localStorage.removeItem("token");
                        navigate("/login");
                    }
                });
        };
        fetchData();
    }, [navigate]);
    return (
        <Layout className="site-layout">
            <Divider orientation="left">
                <Typography>
                    <Typography.Title style={{ color: "white" }}>
                        Folder
                    </Typography.Title>
                </Typography>
            </Divider>
            <Divider orientation="left">
                <Button
                    type="primary"
                    size="large"
                    onClick={() => setIsModalOpen(true)}
                >
                    Create Folder
                </Button>
                <FolderModal
                    isModalOpen={isModalOpen}
                    setIsModalOpen={setIsModalOpen}
                    createFolder={createFolderHandler}
                />
            </Divider>

            <Spin spinning={loading}>
                <List
                    grid={{ gutter: 16, column: 7 }}
                    dataSource={folders}
                    renderItem={(item, i) => (
                        <List.Item
                            key={i}
                            onClick={() => {
                                navigate(`/folders/${parseInt(item.id, 10)}`);
                            }}
                        >
                            <Card
                                cover={
                                    <FolderFilled
                                        style={{
                                            fontSize: "580%",
                                            cursor: "pointer",
                                        }}
                                    />
                                }
                                style={{
                                    backgroundColor: "rgb(27, 25, 25)",
                                    textAlign: "center",
                                }}
                                bordered={false}
                            >
                                {item.name}
                            </Card>
                        </List.Item>
                    )}
                />
            </Spin>
        </Layout>
    );
}
export default FolderList;
