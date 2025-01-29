import { useDispatch, useSelector } from "react-redux";
import { actions } from "./SubjectSlice.js";
import { Button, Flex } from "antd";
import { useEffect } from "react";
import { fetchWrapper } from "../../utils/fetchWrapper.js";
import { Table } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { ModalRead } from "./ModalRead.jsx";
import { CRUD } from "../../utils/consts.js";
import { ModalUpdate } from "./ModalUpdate.jsx";
import { ModalDelete } from "./ModalDelete.jsx";

export function Subjects() {
    const { data } = useSelector((state) => state.Subject);

    const dispatch = useDispatch();

    async function fetchData() {
        const result = await fetchWrapper("subjects", { method: "GET" }, true);
        dispatch(actions.setData(result.data));
    }

    useEffect(() => {
        fetchData();
    }, []);

    const columns = [
        {
            title: "Id",
            dataIndex: "id",
            key: "id",
            render: (cell) => <div>{cell}</div>,
        },
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
            render: (cell) => <div>{cell}</div>,
        },
        {
            title: "Description",
            dataIndex: "description",
            key: "description",
            render: (cell) => <div>{cell}</div>,
        },
        {
            title: "ParentId",
            dataIndex: "parentId",
            key: "parentId",
            render: (cell) => <div>{cell}</div>,
        },
        {
            title: "Action",
            dataIndex: "action",
            key: "action",
            width: 150,
            render: (text, record) => (
                <Flex
                    gap="small"
                    wrap
                    onClick={(e) => {
                        e.stopPropagation();
                    }}
                >
                    <Button onClick={() => {
                        dispatch(actions.setCurrentRecordId(record.id));
                        dispatch(actions.setOpened(CRUD.UPDATE));
                    }} color="primary" variant="outlined">
                        <EditOutlined />
                    </Button>
                    <Button onClick={() => {
                        dispatch(actions.setCurrentRecordId(record.id));
                        dispatch(actions.setOpened(CRUD.DELETE));
                    }} color="danger" variant="outlined">
                        <DeleteOutlined />
                    </Button>
                </Flex>
            ),
        },
    ];

    return (
        <div>
            <Button type="primary" onClick={() => fetchData()}>
                Fetch Data
            </Button>
            <ModalRead />
            <ModalUpdate />
            <ModalDelete />
            <Table
                columns={columns}
                dataSource={data}
                onRow={(record) => ({
                    onClick: () => {
                        dispatch(actions.setOpened(CRUD.READ));
                        dispatch(actions.setCurrentRecordId(record.id));
                    },
                })}
                bordered
                rowKey="id"
            />
        </div>
    );
}
