import { InboxOutlined } from "@ant-design/icons";
import { Button, Image, Layout, Popconfirm, Row, Space, Upload } from "antd";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { deleteFile, getFolder, updateFolder } from "../../apis/folder";
import Notification from "../../functions/notification";
import { Folder as FolderInterface } from "../../types/folder";

function Folder() {
    const params = useParams();
    const [folders, setFolders] = useState<FolderInterface[]>([]);
    const [showUploadedList, setShowUploadedList] = useState(true);
    const deleteImage = (fileId: number) => {
        deleteFile(fileId, parseInt(params.folderId!, 10))
            .then(() => {
                setFolders(folders.filter((folder) => folder.id !== fileId));
            })
            .catch((err) => {
                Notification(err.message, false);
            });
    };
    useEffect(() => {
        getFolder(parseInt(params.folderId!, 10))
            .then((res) => {
                setFolders(res.data);
            })
            .catch((err) => {
                console.log(err.response);
            });
    }, [params.folderId]);

    return (
        <Layout className="site-layout">
            <Upload.Dragger
                multiple
                name="file"
                customRequest={(options) => {
                    const file = new FormData();
                    file.append("file", options.file);
                    updateFolder(parseInt(params.folderId!, 10), file)
                        .then((res) => {
                            setFolders([...folders, res.data]);
                            setTimeout(() => {
                                setShowUploadedList(false);
                            }, 6000);
                        })
                        .catch((err) => {
                            Notification(err.message, false);
                        });
                }}
                style={{
                    backgroundColor: "#646464",
                    width: "70%",
                    margin: "auto",
                }}
                showUploadList={showUploadedList}
                onChange={(info: any) => {
                    const { status } = info.file;
                    if (status !== "uploading") {
                        console.log(info.file, info.fileList);
                    }

                    if (status === "done") {
                        setFolders([...folders, info.file.response]);
                        setTimeout(() => {
                            setShowUploadedList(false);
                        }, 6000);
                    }
                }}
            >
                <p className="ant-upload-drag-icon">
                    <InboxOutlined />
                </p>
                <p className="ant-upload-text">
                    Click or drag file to this area to upload
                </p>
            </Upload.Dragger>

            <Image.PreviewGroup>
                <Row gutter={7}>
                    {folders.map((item) => {
                        return (
                            <Space direction="vertical" align="center">
                                <Image
                                    key={item.id}
                                    width={200}
                                    height={200}
                                    src={item.s3_url}
                                />
                                <Popconfirm
                                    title="Are you sure to delete this folder?"
                                    onConfirm={() => deleteImage(item.id)}
                                    onCancel={() => {
                                        Notification("Delete failed", false);
                                    }}
                                    okText="Yes"
                                    cancelText="No"
                                    style={{
                                        backgroundColor: "rgb(27, 25, 25)",
                                        color: "white",
                                    }}
                                >
                                    <Button type="primary" danger>
                                        Delete
                                    </Button>
                                </Popconfirm>
                            </Space>
                        );
                    })}
                </Row>
            </Image.PreviewGroup>
        </Layout>
    );
}

export default Folder;
