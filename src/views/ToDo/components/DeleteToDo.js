import { Button, message, Modal } from "antd";
import React, { forwardRef, useImperativeHandle, useState } from "react";
import { t } from "i18next";
import {deleteToDo} from "services";
import { handleHttpError } from "helpers";

const DeleteToDo = ({ onRefresh }, ref) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [todo, setTodo] = useState();
  const [loading, setLoading] = useState(false);

  useImperativeHandle(ref, () => ({
    show: (item) => {
      setTodo(item);
      setIsModalVisible(true);
    },
  }));

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const onConfirm = async () => {
    await setLoading(true)
    try {
      const res = await deleteToDo(todo.uuid);
      if (res.data.status === "success") {
        message.success(`Todo deleted successfully`);
        onRefresh(true);
      } else {
        message.success(`Todo deleted failed`);
      }
    } catch (error) {
      const errorData = handleHttpError(error);
      message.error(errorData.messageDetail ?? error.message);
    }
    setIsModalVisible(false);
    await setLoading(false);
  };
  return (
    <Modal
      closable
      visible={isModalVisible}
      onCancel={handleCancel}
      footer={null}
      centered
      wrapClassName="no-scrollbar py-10"
    >
      <div className="flex justify-center flex-col">
        <p className="text-lg font-bold pb-4">{t("todo.props.question_delete")}</p>
        <div>
          <h1 className="font-[700] text-[32px] truncate">{todo?.title}</h1>
        </div>
      </div>
      <div className="pt-8 flex justify-center">
        <Button
          className="btn btn-primary btn-outline mr-4"
          type="submit"
          onClick={() => {
            setIsModalVisible(false);
          }}
        >
          {t("meeting.props.no")}
        </Button>
        <Button className="btn btn-primary" type="submit" onClick={onConfirm}>
          {t("meeting.props.yes")}
        </Button>
      </div>
    </Modal>
  );
};

export default forwardRef(DeleteToDo);
