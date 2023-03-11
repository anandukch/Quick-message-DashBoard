import { Button, Drawer, Space } from "antd";
import type { DrawerProps } from "antd/es/drawer";
import type { RadioChangeEvent } from "antd/es/radio";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import DrawerFolder from "./DrawerFolder";
import DrawerFolderList from "./DrawerFolderList";

function DrawerComponent(props: any) {
    const { onImageSelect, json } = props;
    const [open, setOpen] = useState(false);
    const [folderSelected, setFolderSelected] = useState<any>();
    const [goBack, setGoBack] = useState(false);
    const [image, setImage] = useState(json.content);

    const showDrawer = () => {
        setOpen(true);
    };

    const onClose = () => {
        console.log(image);
        onImageSelect({ ...json, content: image });
        setOpen(false);
    };
    const onGoBack = () => {
        setFolderSelected(undefined);
        setGoBack(!goBack);
    };

    const onClicked = (id: any) => {
        setFolderSelected(id);
        setGoBack(true);
    };

    return (
        <>
            <Space style={{ margin: "15% 0% 6% 30%" }}>
                <Button type="primary" onClick={showDrawer} size="large">
                    Select content
                </Button>
            </Space>
            <Drawer
                bodyStyle={{
                    backgroundColor: "rgb(84 84 84 / 35%)",
                    border: "1px solid rgb(65 65 65)",
                }}
                placement="right"
                width={500}
                onClose={onClose}
                open={open}
                extra={
                    <Space>
                        <Button onClick={onGoBack} type="ghost">
                            Go Back
                        </Button>
                        <Button type="primary" onClick={onClose}>
                            OK
                        </Button>
                    </Space>
                }
            >
                {
                    // eslint-disable-next-line no-nested-ternary
                    folderSelected && goBack ? (
                        <DrawerFolder
                            folderId={folderSelected}
                            image={image}
                            setImage={setImage}
                        />
                    ) : (
                        <DrawerFolderList onClicked={onClicked} />
                    )
                }
            </Drawer>
        </>
    );
}

export default DrawerComponent;
