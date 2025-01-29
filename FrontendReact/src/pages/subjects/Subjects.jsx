import { useDispatch, useSelector } from "react-redux";
import { setOpened, setData } from "./SubjectSlice.js";
import { Button, Modal } from "antd";
import { useEffect } from "react";
import { fetchWrapper } from "../../utils/fetchWrapper.js";
import { Table } from 'antd';
import { EditOutlined, DeleteOutlined } from "@ant-design/icons"

const columns = [
    {
        title: "Id",
        dataIndex: "id",
        key: "id",
        render: (cell) => <div>{cell}</div>
    },
    {
        title: "Name",
        dataIndex: "name",
        key: "name",
        render: (cell) => <div>{cell}</div>
    },
    {
        title: "Description",
        dataIndex: "description",
        key: "description",
        render: (cell) => <div>{cell}</div>
    },
    {
        title: "ParentId",
        dataIndex: "parentId",
        key: "parentId",
        render: (cell) => <div>{cell}</div>
    },
    {
        title: "Action",
        dataIndex: "action",
        key: "action",
        render: (cell) => <div><EditOutlined /><DeleteOutlined /></div>
    },
]

export function Subjects() {
    const { data, opened } = useSelector((state) => state.Subject);

    async function fetchData() {
        const result = await fetchWrapper("subjects", { method: "GET" }, true)
        dispatch(setData(result.data))
    }

    useEffect(() => {
        fetchData();
    }, [])

    const dispatch = useDispatch()

    return (
        <div>
            <Button type="primary" onClick={() => fetchData()}>
                Fetch Data
            </Button>
            <Button type="primary" onClick={() => dispatch(setOpened(true))}>
                Open Modal
            </Button>
            <Modal
                title="Basic Modal"
                open={opened}
                onOk={() => dispatch(setOpened(false))}
                onCancel={() => dispatch(setOpened(false))}
            >
                <p>Some contents...</p>
                <p>Some contents...</p>
                <p>Some contents...</p>
            </Modal>
            <Table columns={columns} dataSource={data} />
            
        </div>
    );
}
