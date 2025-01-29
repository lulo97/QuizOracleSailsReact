import { actions } from "./SubjectSlice.js";
import { Modal } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { CRUD } from "../../utils/consts.js";

export function ModalDelete() {

    const { openedDelete, currentRecordId, data } = useSelector((state) => state.Subject);

    const dispatch = useDispatch();

    const currentRecord = data.find(ele => ele.id == currentRecordId);

    return (
        <div>
            <Modal
                title="Delete"
                open={openedDelete}
                onOk={() => dispatch(actions.setOpened(CRUD.DELETE))}
                onCancel={() => dispatch(actions.setOpened(CRUD.DELETE))}
            >
                {JSON.stringify(currentRecord)}
            </Modal>
        </div>
    )
}