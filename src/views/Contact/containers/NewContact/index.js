import React, {useState} from "react";
import moment from "moment";
import {IoTv} from "react-icons/io5";
import * as yup from "yup";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {useNavigate} from "react-router-dom";
import { withTranslation } from "react-i18next";
import {message} from "antd";
import {routeUrls} from "../../../../configs";
import {
  AlertError,
  BrandLogoLoading,
  Button,
  DateTimePicker,
  GroupLayout,
  GroupTitle,
  Input,
  MainLayout
} from "../../../../components";
import {postToDo} from "../../../../services";
import {handleHttpError} from "../../../../helpers";

const NewContact = ({t}) => {
  const [fetchLoading, setFetchLoading] = useState(false);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const schema = yup.object().shape({
    title: yup.string().required(),
    date: yup.date().required(),

  });

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (values) => {
    await setLoading(true);
    try {
      const data = {...values};
      data.date = moment(data.date).format("YYYY-MM-DD");

      const res = await postToDo(data);
      if (res?.data) {
        navigate(`/${routeUrls.todo.path}`);
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
              <GroupTitle icon={<IoTv />} title={t("todo.newTodo")} />
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
                    register={register("title")}
                    label={t("meeting.props.title")}
                    placeholder={t("todo.enter_to_do")}
                    error={errors.title}
                  />
                </div>
              </GroupLayout>
              <GroupLayout className="w-full space-y-4">
                <div className="w-full sm:flex sm:flex-row sm:justify-between sm:space-x-4">
                  <div className="w-full mt-2">
                    <DateTimePicker
                      label={t("todo.time")}
                      placeholder={moment().format("DD/MM/YYYY")}
                      onChangeDateTime={(date) => {
                        setValue("date", date)
                      }}
                      format="DD/MM/YYYY"
                      error={errors.date}
                    />
                  </div>
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
                      navigate(`/${routeUrls.newContact.path}`);
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

export default withTranslation()(NewContact);
