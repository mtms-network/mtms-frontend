import { Button, message, Modal } from "antd";
import React, { forwardRef, useImperativeHandle, useState } from "react";
import { t } from "i18next";
import moment from "moment";
import { deleteMeetingByUuid } from "services";
import { handleHttpError } from "helpers";

const DeleteMeetingModal = ({ onRefresh }, ref) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [meeting, setMeeting] = useState();

  useImperativeHandle(ref, () => ({
    show: (item) => {
      setMeeting(item);
      setIsModalVisible(true);
    },
  }));

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const onConfirm = async () => {
    try {
      const res = await deleteMeetingByUuid(meeting?.uuid);
      if (res.message && res.status) {
        message.success(res.message);
        if (typeof onRefresh === "function") {
          onRefresh();
        }
      } else {
        const errorData = handleHttpError(res);
        message.error(errorData.messageDetail);
      }
    } catch (error) {
      const errorData = handleHttpError(error);
      message.error(errorData.messageDetail ?? error.message);
    }
    setIsModalVisible(false);
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
        <p className="text-lg font-bold pb-4">{t("meeting.props.question_delete")}</p>
        <div>
          <h1 className="font-[700] text-[32px] truncate">{meeting?.title}</h1>
          <div className="text-[16px] text-gray mb-[24px]">{meeting?.type.name}</div>
          <div className="flex flex-row space-x-2">
            <img src="/images/icon/calender.svg" alt="" />
            <span className="text-[16px]">
              {moment(meeting?.start_date_time).format("MMM DD, yyyy h:mm A")}
            </span>
          </div>
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

export default forwardRef(DeleteMeetingModal);
