import { actions } from "./SubjectSlice.js";
import { Modal } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { CRUD } from "../../utils/consts.js";

export function ModalUpdate() {

    const { openedUpdate, currentRecordId, data } = useSelector((state) => state.Subject);

    const dispatch = useDispatch();

    const currentRecord = data.find(ele => ele.id == currentRecordId);

    return (
        <div>
            <Modal
                title="Update"
                open={openedUpdate}
                onOk={() => dispatch(actions.setOpened(CRUD.UPDATE))}
                onCancel={() => dispatch(actions.setOpened(CRUD.UPDATE))}
            >
                {JSON.stringify(currentRecord)}
            </Modal>
        </div>
    )
}