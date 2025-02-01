import { Layout } from "antd";
import { SliderContent } from "./SliderContent";

const { Header, Footer, Sider, Content } = Layout;

export function AppLayout({ children }) {
    return (
        <Layout style={{ minHeight: "100vh", overflow: "hidden" }}>
            <Header style={{ background: "#001529", color: "white", textAlign: "center" }}>Header</Header>
            <Layout>
                <Sider style={{ background: "#fff", padding: "16px" }}><SliderContent /></Sider>
                <Layout style={{ height: "calc(100vh - 64px)" }}>
                    <Content style={{ overflowY: "auto", margin: "16px", padding: "16px", background: "#fff" }}>
                        {children}
                    </Content>
                </Layout>
            </Layout>
        </Layout>
    );
}
