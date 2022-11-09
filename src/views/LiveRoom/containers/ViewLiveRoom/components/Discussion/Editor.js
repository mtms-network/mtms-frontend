import React from "react";
import { Button, Form, Input } from 'antd';

const { TextArea } = Input;

const Editor = ({onChange, onSubmit, submitting, value, rows = 4, parentId, setIsReply }) => {
    return (
        <>
            <Form.Item>
                <TextArea rows={rows} onChange={onChange} value={value} />
            </Form.Item>
            <Form.Item>

                {
                    parentId > 0 && (
                        <Button htmlType="submit" loading={submitting} onClick={setIsReply} type="" className={"mr-2"}>
                            Cancel
                        </Button>
                    )
                }

                <Button htmlType="submit" loading={submitting} onClick={onSubmit} type="primary" className={"btn-primary"}>
                    Add Comment
                </Button>
            </Form.Item>
        </>
    )
}

export default Editor;
