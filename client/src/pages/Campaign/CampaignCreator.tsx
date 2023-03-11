import {
    Button,
    Checkbox,
    Col,
    Form,
    Input,
    InputNumber,
    Layout,
    Row,
    Space,
    Spin,
} from "antd";
import { AxiosError } from "axios";
import React, { useEffect, useState } from "react";
import ReactJson from "react-json-view";
import { useNavigate, useParams } from "react-router";
import {
    getCampaignContent,
    updateCampaign,
    uploadCampaign,
} from "../../apis/campaign";
import DrawerComponent from "../../components/Drawer/Drawer";
import ImagePreview from "../../components/ImagePreview";
import Notification from "../../functions/notification";
import { Campaign } from "../../types/campaign";

const campaignValue = {
    group_id: "",
    branding_text: "",
    quick_message_preview_text: "",
    start_time_24: 0,
    end_time_24: 0,
    disable_close: false,
    content: [],
};
function CampaignCreator() {
    const { groupId } = useParams();
    const [campaign, setCampaign] = React.useState<Campaign>();
    const [checkboxClicked, setCheckboxClicked] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const navigateTo = useNavigate();
    const [form] = Form.useForm();
    const saveJson = () => {
        setIsLoading(true);
        if (groupId) {
            updateCampaign(campaign!.id!, {
                ...campaign,
                disable_close: campaign?.disable_close === true,
            })
                .then(() => {
                    Notification("Json updated successfully", true);
                    setIsLoading(false);
                })
                .catch((err: AxiosError) => {
                    const data = err.response?.data as string;
                    // console.log(data.message);

                    Notification(data || "Json uploaded failed", false);
                });
        } else {
            uploadCampaign({
                ...campaign!,
                disable_close: campaign?.disable_close === true,
            })
                .then(() => {
                    setIsLoading(false);
                    Notification("Campaign Creation successfully", true);
                    setTimeout(() => {
                        navigateTo("/home");
                    }, 1000);
                })
                .catch(() => {
                    setIsLoading(false);
                    Notification("Campaign Creation failed", false);
                });
        }
    };

    useEffect(() => {
        if (groupId) {
            setIsLoading(true);
            getCampaignContent(groupId!)
                .then((res) => {
                    setCampaign(res.data);
                    setCheckboxClicked(res.data.disable_close);
                    setIsLoading(false);
                })
                .catch((err) => {
                    console.log(err);
                });
        } else {
            setCampaign(campaignValue);
        }
    }, [groupId]);
    const onFinish = () => {
        const values = form.getFieldsValue();
        setCampaign({
            id: campaign?.id,
            group_id: values.group_id || campaign?.group_id,
            branding_text: values.branding_text || campaign?.branding_text,
            quick_message_preview_text:
                values.quick_message_preview_text ||
                campaign?.quick_message_preview_text,
            start_time_24: values.start_time_24 || campaign?.start_time_24,
            end_time_24: values.end_time_24 || campaign?.end_time_24,
            content: campaign?.content || [],
            disable_close: !checkboxClicked,
        });
    };

    return (
        <Layout
            className="site-layout"
            style={{
                padding: "50px 20px 20px 20px",
            }}
        >
            <Spin spinning={isLoading}>
                <Space size={17} align="end">
                    <Button type="primary" onClick={saveJson} size="large">
                        {groupId ? "Update Campaign" : "Create Campaign"}
                    </Button>
                </Space>
                <Row gutter={[48, 10]}>
                    <Col span={12}>
                        {campaign && (
                            <Form
                                form={form}
                                name="basic"
                                labelCol={{ span: 8 }}
                                wrapperCol={{ span: 16 }}
                                onChange={onFinish}
                                onFinish={onFinish}
                                autoComplete="off"
                                style={{
                                    marginTop: "10%",
                                }}
                            >
                                <Form.Item label="Group Id" name="group_id">
                                    <Input defaultValue={campaign?.group_id} />
                                </Form.Item>
                                <Form.Item
                                    label="Branding Text"
                                    name="branding_text"
                                >
                                    <Input
                                        defaultValue={campaign?.branding_text}
                                    />
                                </Form.Item>
                                <Form.Item
                                    label="Quick Message"
                                    name="quick_message_preview_text"
                                >
                                    <Input
                                        defaultValue={
                                            campaign?.quick_message_preview_text
                                        }
                                    />
                                </Form.Item>

                                <Row
                                    style={{
                                        marginLeft: "140px",
                                        width: "700px",
                                    }}
                                >
                                    <Col span={12}>
                                        <Form.Item
                                            label="Start Time"
                                            name="start_time_24"
                                        >
                                            <InputNumber
                                                min={0}
                                                max={24}
                                                defaultValue={
                                                    campaign?.start_time_24
                                                }
                                                style={{
                                                    color: "black",
                                                    // marginLeft: "20px",
                                                }}
                                            />
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item
                                            label="End Time"
                                            name="end_time_24"
                                        >
                                            <InputNumber
                                                min={0}
                                                max={24}
                                                defaultValue={
                                                    campaign?.end_time_24
                                                }
                                            />
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Form.Item
                                    name="disable_close"
                                    label="Disable Close"
                                >
                                    <Checkbox
                                        checked={checkboxClicked}
                                        onClick={() => {
                                            setCheckboxClicked(
                                                !checkboxClicked
                                            );
                                        }}
                                    />
                                </Form.Item>
                            </Form>
                        )}

                        {campaign && (
                            <DrawerComponent
                                onImageSelect={setCampaign}
                                json={campaign}
                            />
                        )}

                        {campaign && (
                            <ImagePreview
                                campaign={campaign}
                                setcampaign={setCampaign}
                            />
                        )}
                    </Col>
                    <Col span={12}>
                        <ReactJson
                            src={{
                                group_id: campaign?.group_id,
                                branding_text: campaign?.branding_text,
                                quick_message_preview_text:
                                    campaign?.quick_message_preview_text,
                                start_time_24: campaign?.start_time_24,
                                end_time_24: campaign?.end_time_24,
                                disable_close: campaign?.disable_close,
                                content: campaign?.content,
                            }}
                            style={{
                                padding: "10px",
                                // height: "600px",
                                overflow: "auto",
                            }}
                            theme="ashes"
                        />
                    </Col>
                </Row>
            </Spin>
        </Layout>

        // </NavBar>
    );
}

export default CampaignCreator;
