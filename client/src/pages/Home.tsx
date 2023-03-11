import { Layout } from "antd";
import React from "react";
import Campaigns from "./Campaign/Campaigns";

function Home() {
    return (
        <Layout className="site-layout">
            <Campaigns />
        </Layout>
    );
}

export default Home;
