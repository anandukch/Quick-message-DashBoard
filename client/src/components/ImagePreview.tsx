import React, { useState } from "react";
import {
    Button,
    Image,
    message,
    Popconfirm,
    Row,
    Space,
    Typography,
} from "antd";
import Notification from "../functions/notification";

function ImagePreview(props: any) {
    const { campaign, setcampaign, home } = props;
    return (
        <div
            style={{
                marginTop: "10px",
            }}
        >
            <Typography>
                <Typography.Title
                    style={{
                        marginTop: "10px",
                        marginLeft: "20px",
                        color: "white",
                    }}
                >
                    Preview
                </Typography.Title>
            </Typography>
            <Image.PreviewGroup>
                <Row gutter={7}>
                    {campaign.content.map(
                        (
                            image: {
                                content_id: React.Key | null | undefined;
                                content: string | undefined;
                            },
                            index: any
                        ) => (
                            <Space direction="vertical" align="center">
                                <Image
                                    width={100}
                                    height={100}
                                    src={image.content}
                                />
                                <Popconfirm
                                    title="Are you sure to delete this file?"
                                    onConfirm={() => {
                                        campaign.content.splice(index, 1);
                                        setcampaign({
                                            ...campaign,
                                            content: campaign.content,
                                        });
                                    }}
                                    onCancel={() => {
                                        Notification(
                                            "File deleteion failed",
                                            false
                                        );
                                    }}
                                    okText="Yes"
                                    cancelText="No"
                                    style={{
                                        backgroundColor: "rgb(27, 25, 25)",
                                        color: "white",
                                    }}
                                >
                                    {!home && (
                                        <Button
                                            style={{
                                                color: "white",
                                                backgroundColor: "red",
                                            }}
                                        >
                                            Delete
                                        </Button>
                                    )}
                                </Popconfirm>
                            </Space>
                        )
                    )}
                </Row>
            </Image.PreviewGroup>
        </div>
    );
}

export default ImagePreview;
