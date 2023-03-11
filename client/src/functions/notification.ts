import { notification } from "antd";

function Notification(message: string, success: boolean) {
    return notification.open({
        type: success ? "success" : "error",
        message,
        // style: {
        //     width: 600,
        //     marginLeft: 335 - 600,
        //     backgroundColor: success ? "#1890ff" : "grey",
        //     color: "white",
        // },
    });
}

export default Notification;
