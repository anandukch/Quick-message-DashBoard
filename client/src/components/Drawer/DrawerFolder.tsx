import { Image, List, Spin } from "antd";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getFolder } from "../../apis/folder";
import generateFileType from "../../utils/utils";

function DrawerFolder(props: { folderId: number; setImage: any; image: any }) {
    const { folderId, setImage, image } = props;
    const [folder, setFolder] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        setLoading(true);
        getFolder(folderId!)
            .then((res) => {
                console.log(res.data);
                setFolder(res.data);
                setLoading(false);
            })
            .catch((err) => {
                console.log(err.response);
            });
    }, [folderId]);
    const createContent = (item: any) => {
        const itemType = item.format.split("/")[1];
        const type = generateFileType(itemType);
        return {
            content_id: String(item.id),
            type,
            content: item.s3_url,
        };
    };
    const imageClickHandler = useCallback(
        (item: any) => {
            if (image.find((i: any) => +i.content_id === item.id)) {
                setImage(image.filter((i: any) => +i.content_id !== item.id));
            } else {
                setImage([...image, createContent(item)]);
            }
        },
        [setImage, image]
    );
    return (
        <List
            dataSource={folder}
            renderItem={(item, i) => (
                <Spin spinning={loading}>
                    <List.Item
                        key={i}
                        onClick={() => {
                            imageClickHandler(item);
                        }}
                        style={{
                            cursor: "pointer",
                            backgroundColor: image?.find(
                                (e: any) => +e.content_id === item.id
                            )
                                ? "grey"
                                : "",
                        }}
                    >
                        <Image preview={false} width={200} src={item.s3_url} />
                    </List.Item>
                </Spin>
            )}
        />
    );
}

export default DrawerFolder;
