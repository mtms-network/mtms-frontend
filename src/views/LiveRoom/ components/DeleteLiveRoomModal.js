import { Button, message, Modal } from "antd";
import React, { forwardRef, useImperativeHandle, useState } from "react";
import { t } from "i18next";
import {deleteMeetingByUuid} from "services";
import { handleHttpError } from "helpers";
import {API_RESPONSE_STATUS} from "../../../configs";

const DeleteLiveRoomModal = ({ onRefresh }, ref) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [model, setModel] = useState();
  const [loading, setLoading] = useState(false);

  useImperativeHandle(ref, () => ({
    show: (item) => {
      setModel(item);
      setIsModalVisible(true);
    },
  }));

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const onConfirm = async () => {
    await setLoading(true)
    try {
      const res = await deleteMeetingByUuid(model.uuid);
      if (res?.status === API_RESPONSE_STATUS.success) {
        message.success(`Live room deleted successfully`);
        onRefresh(true);
      } else {
        message.success(`Live room deleted failed`);
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
        <p className="text-lg font-bold pb-4">Are you sure delete live room</p>
        <div>
          <h1 className="font-[700] text-[32px] truncate">{model?.title}</h1>
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

export default forwardRef(DeleteLiveRoomModal);
