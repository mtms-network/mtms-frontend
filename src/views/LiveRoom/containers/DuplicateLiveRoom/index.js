import React from "react";
import { useParams } from "react-router-dom";
import Form from "../../ components/Form";

const DuplicateLiveRoom = () => {
  const { id } = useParams();

  return <Form action={3} id={id} />
};

export default DuplicateLiveRoom;
