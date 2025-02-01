import { actions } from "./SubjectSlice.js";
import { Modal, Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { CRUD } from "../../utils/consts.js";
import { Descriptions } from "antd";
import { fetchWrapper } from "../../utils/fetchWrapper.js";
import { message } from 'antd';

export function ModalDelete() {
    const { openedDelete, currentRecordId, data } = useSelector(
        (state) => state.Subject
    );

    const dispatch = useDispatch();

    const currentRecord = data.find((ele) => ele.id == currentRecordId);

    async function onClick() {
        const result_delete = await fetchWrapper(
            `subjects?id=${currentRecord.id}`,
            { method: "DELETE" }
        );

        if (result_delete.error_code == '0') {
            message.success(result_delete.error_message);
        } else {
            message.error(result_delete.error_message);
        }
        
        const result_get = await fetchWrapper("subjects", { method: "GET" }, true);
        dispatch(actions.setData(result_get.data));

        dispatch(actions.setOpened(CRUD.DELETE))
    }

    return (
        <div>
            <Modal
                title="Delete"
                open={openedDelete}
                onOk={() => dispatch(actions.setOpened(CRUD.DELETE))}
                onCancel={() => dispatch(actions.setOpened(CRUD.DELETE))}
                footer={[
                    <Button key="Cancel">Cancel</Button>,
                    <Button
                        onClick={onClick}
                        color="danger"
                        variant="solid"
                        key="Confirm"
                    >
                        Confirm
                    </Button>,
                ]}
            >
                {JSON.stringify(openedDelete)}
                {currentRecord && (
                    <Descriptions
                        layout="horizontal"
                        bordered
                        size="small"
                        column={1}
                    >
                        <Descriptions.Item label="ID">
                            {currentRecord.id}
                        </Descriptions.Item>
                        <Descriptions.Item label="Name">
                            {currentRecord.name}
                        </Descriptions.Item>
                        <Descriptions.Item label="Description">
                            {currentRecord.description}
                        </Descriptions.Item>
                        <Descriptions.Item label="Parent ID">
                            {currentRecord.parentId}
                        </Descriptions.Item>
                    </Descriptions>
                )}
            </Modal>
        </div>
    );
}
