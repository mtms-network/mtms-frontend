import { Button, message, Modal } from "antd";
import React, { forwardRef, useImperativeHandle, useState } from "react";
import { t } from "i18next";
import {deleteContact, deleteMeetingByUuid, deleteToDo} from "services";
import { handleHttpError } from "helpers";
import {useNavigate} from "react-router-dom";
import {routeUrls} from "../../../configs";
import moment from "moment";

const DeleteContact = ({ onRefresh }, ref) => {
  const navigate = useNavigate();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [contact, setContact] = useState();
  const [loading, setLoading] = useState(false);

  useImperativeHandle(ref, () => ({
    show: (item) => {
      setContact(item);
      setIsModalVisible(true);
    },
  }));

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const onConfirm = async () => {
    await setLoading(true)
    try {
      const res = await deleteContact(contact?.uuid);
      if (res?.data?.status === "success") {
        message.success(`Contact deleted successfully`);
        onRefresh(true);
      } else {
        message.error(`Contact deleted failed`);
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
        <p className="text-lg font-bold pb-4">Are you sure delete contact?</p>
        <div>
          <h1 className="font-[700] text-[32px] truncate">{contact?.name}</h1>
          <div className="flex flex-row space-x-2">
            { contact?.email }
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

export default forwardRef(DeleteContact);
