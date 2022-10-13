import React from "react";
import { useParams } from "react-router-dom";
import Form from "../../ components/Form";

const EditLiveRoom = () => {
  const { id } = useParams();

  return <Form action={2} id={id} />
};

export default EditLiveRoom;
