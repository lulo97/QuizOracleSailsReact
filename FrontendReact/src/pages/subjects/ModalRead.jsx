import { actions } from "./SubjectSlice.js";
import { Modal } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { CRUD } from "../../utils/consts.js";

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
                {JSON.stringify(currentRecord)}
            </Modal>
        </div>
    )
}