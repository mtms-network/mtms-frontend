import React, {useEffect, useState} from "react";
import {IoTv} from "react-icons/io5";
import * as yup from "yup";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {useNavigate, useParams} from "react-router-dom";
import { withTranslation } from "react-i18next";
import {message} from "antd";
import {routeUrls} from "../../../../configs";
import {
  BrandLogoLoading,
  Button,
  GroupLayout,
  GroupTitle,
  Input,
  MainLayout
} from "../../../../components";
import {getDetailContact, patchContact, postContact, postToDo} from "../../../../services";
import {handleHttpError} from "../../../../helpers";

const EditContact = ({t}) => {
  const { uuid } = useParams();

  const [fetchLoading, setFetchLoading] = useState(false);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [contact, setContact] = useState(null);

  const schema = yup.object().shape({
    name: yup.string().required().max(40).min(3),
    email: yup.string().required().email(),
    company: yup.string().max(100),
    position: yup.string().max(50),
    phone_number: yup.string().max(15),
  });

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const fetchData = async () => {
    const res = await getDetailContact(uuid);
    setValue('name', res?.name);
    setValue('email', res?.email);
    setValue('company', res?.company);
    setValue('position', res?.position);
    setValue('phone_number', res?.phone_number);
  };


  useEffect(() => {
    if(uuid){
      fetchData().then();
    }
  }, [uuid])

  const onSubmit = async (values) => {
    await setLoading(true);
    try {
      const data = {...values};

      const res = await patchContact(uuid, data);
      if (res?.data) {
        navigate(`/${routeUrls.contact.path}`);
        message.success(res?.data?.message);
      } else if (res?.request) {
        const errorData = handleHttpError(res);
        message.error(errorData.messageDetail);
      }
    }catch (error){
      if (error) {
        const errorData = handleHttpError(error);
        message.error(errorData?.message);
      }
    }
  };

  return (
    <MainLayout>
      {fetchLoading && (
        <div className="h-96">
          <BrandLogoLoading />
        </div>
      )}
      {!fetchLoading && (
        <>
          <div className="flex flex-row justify-between w-full py-2">
            <div className="flex-1 text-center">
              <GroupTitle icon={<IoTv />} title="New contact" />
            </div>
          </div>
          <div className="w-[90%] m-auto bg-white rounded-[20px] md:w-[80%] lx:w-[60%]">
            <form onSubmit={handleSubmit(onSubmit)}>
              <GroupLayout className="flex flex-col justify-between">
                <div className="w-full h-auto">
                  <Input
                    required
                    className="w-full"
                    labelClassName="text-base"
                    register={register("name")}
                    label="Name"
                    placeholder="Enter name"
                    error={errors.name}
                  />
                </div>
              </GroupLayout>
              <GroupLayout className="flex flex-col justify-between">
                <div className="w-full h-auto">
                  <Input
                    required
                    className="w-full"
                    labelClassName="text-base"
                    register={register("email")}
                    label="Email"
                    placeholder="Enter email"
                    error={errors.email}
                  />
                </div>
              </GroupLayout>
              <GroupLayout className="flex flex-col justify-between">
                <div className="w-full h-auto">
                  <Input
                    className="w-full"
                    labelClassName="text-base"
                    register={register("company")}
                    label="Company"
                    placeholder="Enter comapny"
                  />
                </div>
              </GroupLayout>
              <GroupLayout className="flex flex-col justify-between">
                <div className="w-full h-auto">
                  <Input
                    className="w-full"
                    labelClassName="text-base"
                    register={register("position")}
                    label="Job"
                    placeholder="Enter position"
                  />
                </div>
              </GroupLayout>
              <GroupLayout className="flex flex-col justify-between">
                <div className="w-full h-auto">
                  <Input
                    className="w-full"
                    labelClassName="text-base"
                    register={register("phone_number")}
                    label="Phone number"
                    placeholder="Enter phone number"
                  />
                </div>
              </GroupLayout>
            </form>
            <div className="w-full sm:flex sm:flex-row justify-between pt-2 pb-8 space-y-2 sm:space-y-0">
              <div className="w-full flex justify-center items-center">
                <Button
                  className="btn btn-primary btn-outline mr-4"
                  type="submit"
                  onClick={() => {
                    if(!loading){
                      navigate(`/${routeUrls.contact.path}`);
                    }
                  }}
                  disabled={loading}
                >
                  {t("general.cancel")}
                </Button>
                <Button
                  className="btn btn-primary"
                  isLoading={loading}
                  type="submit"
                  onClick={handleSubmit(onSubmit)}
                >
                  {t("general.create")}
                </Button>
              </div>
            </div>
          </div>
        </>
      )}
    </MainLayout>
  );
};

export default withTranslation()(EditContact);
