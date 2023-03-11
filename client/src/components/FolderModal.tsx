import { Input, Modal } from "antd";
import React, { useState } from "react";
import Notification from "../functions/notification";

function FolderModal(props: any) {
    const { isModalOpen, setIsModalOpen, createFolder } = props;
    const [folderName, setFolderName] = useState("");
    const handleOk = () => {
        createFolder(folderName)
            .then(() => {
                setFolderName("");
                setIsModalOpen(false);
            })
            .catch((err: any) => {
                Notification("Folder Creation failed", false);
            });
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };
    return (
        <Modal
            style={{ padding: "0px", backgroundColor: "rgb(62 62 62)" }}
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
            okText="Create"
        >
            <Input
                style={{
                    fontSize: "1.2rem",
                }}
                placeholder="Enter folder name here..."
                bordered={false}
                value={folderName}
                onChange={(e) => {
                    setFolderName(e.target.value);
                }}
            />
        </Modal>
    );
}

export default FolderModal;
