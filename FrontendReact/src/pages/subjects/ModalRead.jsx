import { actions } from "./SubjectSlice.js";
import { Modal } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { CRUD } from "../../utils/consts.js";
import { Descriptions } from 'antd';

export function ModalRead() {

    const { openedRead, currentRecordId, data } = useSelector((state) => state.Subject);

    const dispatch = useDispatch();

    const currentRecord = data.find(ele => ele.id == currentRecordId);

    return (
        <div>
            <Modal
                title="Read"
                open={openedRead}
                onOk={() => dispatch(actions.setOpened(CRUD.READ))}
                onCancel={() => dispatch(actions.setOpened(CRUD.READ))}
            >
                {currentRecord && (
                    <Descriptions layout="horizontal" bordered size="small" column={1}>
                        <Descriptions.Item label="ID">{currentRecord.id}</Descriptions.Item>
                        <Descriptions.Item label="Name">{currentRecord.name}</Descriptions.Item>
                        <Descriptions.Item label="Description">{currentRecord.description}</Descriptions.Item>
                        <Descriptions.Item label="Parent ID">{currentRecord.parentId}</Descriptions.Item>
                    </Descriptions>
                )}
            </Modal>
        </div>
    );
}
