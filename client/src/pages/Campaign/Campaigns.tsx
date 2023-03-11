import { SearchOutlined } from "@ant-design/icons";
import { Button, Input, Space, Table, InputRef, Spin, Popconfirm } from "antd";
import type { ColumnsType, ColumnType } from "antd/es/table";
import type { FilterConfirmProps } from "antd/es/table/interface";
import React, { useEffect, useRef, useState } from "react";
import Highlighter from "react-highlight-words";
import { useNavigate } from "react-router";
import { deleteCampaignContent, getCampaign } from "../../apis/campaign";
import Notification from "../../functions/notification";

interface DataType {
    group_id: string;
    branding_text: string;
    id: number;
    quick_message_preview_text: string;
}

type DataIndex = keyof DataType;

function JsonTable() {
    const [campaign, setCampaign] = useState<DataType[]>([]);
    const [searchText, setSearchText] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [searchedColumn, setSearchedColumn] = useState("");
    const searchInput = useRef<InputRef>(null);
    const navigate = useNavigate();
    useEffect(() => {
        setIsLoading(true);
        getCampaign()
            .then((res) => {
                setIsLoading(false);
                setCampaign(res.data);
            })
            .catch((err) => {
                console.error(err);
            });
    }, [navigate]);
    const handleSearch = (
        selectedKeys: string[],
        confirm: (param?: FilterConfirmProps) => void,
        dataIndex: DataIndex
    ) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };

    const handleReset = (clearFilters: () => void) => {
        clearFilters();
        setSearchText("");
    };

    const getColumnSearchProps = (
        dataIndex: DataIndex
    ): ColumnType<DataType> => ({
        // eslint-disable-next-line react/no-unstable-nested-components
        filterDropdown: ({
            setSelectedKeys,
            selectedKeys,
            confirm,
            clearFilters,
        }) => (
            <div style={{ padding: 8, backgroundColor: "rgb(62 62 62)" }}>
                <Input
                    ref={searchInput}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) =>
                        setSelectedKeys(e.target.value ? [e.target.value] : [])
                    }
                    onPressEnter={() =>
                        handleSearch(
                            selectedKeys as string[],
                            confirm,
                            dataIndex
                        )
                    }
                    style={{
                        marginBottom: 8,
                        display: "block",
                        backgroundColor: "rgb(124 124 124)",
                        color: "black",
                    }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() =>
                            handleSearch(
                                selectedKeys as string[],
                                confirm,
                                dataIndex
                            )
                        }
                        icon={<SearchOutlined />}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Search
                    </Button>
                    <Button
                        onClick={() =>
                            clearFilters && handleReset(clearFilters)
                        }
                        size="small"
                        style={{ width: 90 }}
                        type="primary"
                    >
                        Reset
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            confirm({ closeDropdown: false });
                            setSearchText((selectedKeys as string[])[0]);
                            setSearchedColumn(dataIndex);
                        }}
                        style={{
                            color: "#1890ff",
                            backgroundColor: "black",
                        }}
                    >
                        Filter
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            confirm({ closeDropdown: true });
                        }}
                    >
                        close
                    </Button>
                </Space>
            </div>
        ),
        // eslint-disable-next-line react/no-unstable-nested-components
        filterIcon: (filtered: boolean) => (
            <SearchOutlined
                style={{ color: filtered ? "#1890ff" : undefined }}
            />
        ),
        onFilter: (value, record) =>
            record[dataIndex]
                .toString()
                .toLowerCase()
                .includes((value as string).toLowerCase()),
        onFilterDropdownOpenChange: (visible) => {
            if (visible) {
                setTimeout(() => searchInput.current?.select(), 100);
            }
        },
        render: (text) =>
            searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{
                        backgroundColor: "rgb(131 131 131 / 33%)",
                        padding: 0,
                    }}
                    searchWords={[searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ""}
                />
            ) : (
                text
            ),
    });

    const columns: ColumnsType<DataType> = [
        {
            title: "Group Id",
            dataIndex: "group_id",
            key: "group_id",
            width: "30%",
            ...getColumnSearchProps("group_id"),
        },
        {
            title: "Branding Text",
            dataIndex: "branding_text",
            key: "branding_text",
            width: "20%",
            ...getColumnSearchProps("branding_text"),
        },
        {
            title: "Quick Message Preview",
            dataIndex: "quick_message_preview_text",
            key: "quick_message_preview_text",
            ...getColumnSearchProps("quick_message_preview_text"),
        },
        {
            title: "Action",
            key: "action",
            render: (text, record) => (
                <Space size="middle">
                    <Button
                        type="primary"
                        onClick={() => {
                            navigate(`/campaigns/${record.id}`);
                        }}
                    >
                        Edit
                    </Button>
                    <Popconfirm
                        title="Are you sure to delete this file?"
                        onConfirm={() => {
                            deleteCampaignContent(record.id);
                            setCampaign(
                                campaign.filter((item) => item.id !== record.id)
                            );
                        }}
                        onCancel={() => {
                            Notification("Campaign deletion failed", false);
                        }}
                        okText="Yes"
                        cancelText="No"
                        cancelButtonProps={{
                            style: {
                                backgroundColor: "grey",
                            },
                        }}
                        style={{
                            backgroundColor: "rgb(27, 25, 25)",
                            color: "black",
                        }}
                    >
                        {" "}
                        <Button type="primary" danger>
                            Delete
                        </Button>
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    return (
        <Spin spinning={isLoading}>
            <Table columns={columns} dataSource={campaign} />
        </Spin>
    );
}

export default JsonTable;
