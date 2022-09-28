import React from "react";
import {MainLayout} from "../../components";
import ListContact from "./components/ListContact";

const Contact = () => {
  return (
    <MainLayout>
      <div className="flex flex-col sm:flex-row gap-4">
        <ListContact className="flex basis-full w-full" />
      </div>
    </MainLayout>
  );
};

export default Contact;
