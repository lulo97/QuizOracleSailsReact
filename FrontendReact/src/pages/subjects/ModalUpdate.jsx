import { actions } from "./SubjectSlice.js";
import { Modal, Input, Form, Button, Checkbox } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { CRUD } from "../../utils/consts.js";
import TextArea from "antd/es/input/TextArea.js";

export function ModalUpdate() {
    const { openedUpdate, currentRecordId, data } = useSelector(
        (state) => state.Subject
    );
    const dispatch = useDispatch();

    const currentRecord = data.find((ele) => ele.id == currentRecordId);

    const onFinish = (values) => {
        console.log("Success:", values);
    };

    const onFinishFailed = (errorInfo) => {
        console.log("Failed:", errorInfo);
    };

    return (
        <div>
            <Modal
                title="Update"
                open={openedUpdate}
                onOk={() => dispatch(actions.setOpened(CRUD.UPDATE))}
                onCancel={() => dispatch(actions.setOpened(CRUD.UPDATE))}
                footer={[
                    <Button key="Cancel">Cancel</Button>,
                    <Button color="primary" variant="solid" key="Confirm">Update</Button>
                  ]}
            >
                {currentRecord && (
                    <Form
                        name="basic"
                        labelCol={{
                            span: 8,
                        }}
                        wrapperCol={{
                            span: 16,
                        }}
                        labelAlign="left"
                        initialValues={{
                            remember: true,
                        }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                    >
                        <Form.Item
                            label="Name"
                            name="Name"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input Name!",
                                },
                            ]}
                        >
                            <Input defaultValue={currentRecord.name} />
                        </Form.Item>

                        <Form.Item
                            label="Description"
                            name="Description"
                        >
                            <TextArea defaultValue={currentRecord.description} />
                        </Form.Item>

                        <Form.Item
                            label="Parent"
                            name="Parent"
                        >
                            <Input defaultValue={currentRecord.parentId} />
                        </Form.Item>

                        <Form.Item
                            label="Vietnamese"
                            name="Vietnamese"
                        >
                            <Input defaultValue={""} />
                        </Form.Item>

                        <Form.Item
                            label="English"
                            name="English"
                        >
                            <Input defaultValue={""} />
                        </Form.Item>
                    </Form>
                )}
            </Modal>
        </div>
    );
}
