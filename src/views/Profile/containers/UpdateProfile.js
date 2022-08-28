import React, { useState, useMemo } from "react";
import { Button, GroupLayout, GroupTitle, Input, MainLayout } from "components";
import { IoTv } from "react-icons/io5";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { routeUrls, API_RESPONSE_STATUS, LIVE_URL, LIVE_API } from "configs";
import { getAccessToken, handleHttpError, setTokenLoginSucceeded } from "helpers";
import { useNavigate } from "react-router-dom";
import { withTranslation } from "react-i18next";
import { updateProfile } from "services";
import { message, Upload } from "antd";
import { useAppStore } from "stores/app.store";

const UpdateProfile = ({ t }) => {
  const [appStore, updateAppStore] = useAppStore();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const schema = yup
    .object()
    .shape({
      name: yup.string(),
      username: yup.string(),
      email: yup.string(),
      phoneNumber: yup.string(),
    })
    .required();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const user = useMemo(() => {
    setValue("name", appStore.user?.profile?.name);
    setValue("username", appStore.user?.username);
    setValue("email", appStore.user?.email);
    setValue("phone", appStore.user?.profile?.phone);
    return appStore.user;
  }, [appStore.user]);
  const token = getAccessToken();

  const onSubmit = async (values) => {
    try {
      setLoading(true);
      const res = await updateProfile({ name: values.name, phone: values.phone });
      const newUser = {
        ...user,
        profile: { ...user.profile, name: values.name, phone: values.phone },
      };
      setTokenLoginSucceeded({ accessToken: token, user: newUser });
      updateAppStore((draft) => {
        draft.user = newUser;
      });

      if (res.status === API_RESPONSE_STATUS.success) {
        message.success(res.message);
      }
    } catch (error) {
      if (error) {
        const errorData = handleHttpError(error);
        message.success(errorData.message);
      }
      setLoading(false);
    }
  };

  const propsUpload = {
    name: "file",
    action: `${LIVE_API}/profile/avatar`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    onChange(info) {
      setLoading(true);
      if (info.file.status === "done") {
        setLoading(false);
        message.success(`${info.file.name} file uploaded successfully`);
        const newUser = {
          ...user,
          profile: { ...user.profile, avatar: info.file.response.avatar },
        };
        setTokenLoginSucceeded({ accessToken: token, user: newUser });
        updateAppStore((draft) => {
          draft.user = newUser;
        });
      } else if (info.file.status === "error") {
        setLoading(false);
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  const onChangeProfilePhoto = () => {};

  return (
    <MainLayout>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-row justify-between w-full py-2">
          <div className="flex-1 text-center">
            <GroupTitle icon={<IoTv />} title={t("profile.edit")} />
          </div>
        </div>
        <div className="w-[60%] m-auto bg-white rounded-[20px]">
          <GroupLayout className="flex flex-col justify-between">
            <div className="w-full h-auto pt-6 flex flex-col justify-center items-center">
              {user?.profile?.avatar && (
                <img
                  className="w-[100px] h-[100px] rounded-full object-cover"
                  alt="avatar"
                  src={`${LIVE_URL}${user?.profile?.avatar}`}
                />
              )}
              <p className="pt-3 font-bold">{user?.username}</p>
              <div className="pt-3">
                <Upload {...propsUpload}>
                  <a className="btn-text-primary text-md" onClick={onChangeProfilePhoto}>
                    {t("profile.change_photo")}
                  </a>
                </Upload>
              </div>
            </div>
            <div className="w-full h-auto pt-10">
              <Input
                className="w-full"
                labelClassName="text-base"
                register={register("name")}
                label={t("profile.name")}
                error={errors.name}
              />
            </div>
            <div className="w-full h-auto pt-4">
              <Input
                className="w-full !bg-disable"
                labelClassName="text-base"
                register={register("username")}
                label={t("profile.username")}
                disabled
                error={errors.username}
              />
            </div>
            <div className="w-full h-auto pt-4">
              <Input
                className="w-full !bg-disable"
                labelClassName="text-base"
                register={register("email")}
                label="Email"
                disabled
                error={errors.email}
              />
            </div>
            <div className="w-full h-auto pt-4">
              <Input
                className="w-full"
                labelClassName="text-base"
                register={register("phone")}
                label={t("profile.phone")}
                error={errors.phone}
              />
            </div>
          </GroupLayout>
        </div>
      </form>
      <div className="w-[60%] m-auto pt-8 rounded-[20px] flex flex-col justify-center items-center">
        <div>
          <Button
            className="btn btn-primary"
            type="primary"
            loading={loading}
            onClick={handleSubmit(onSubmit)}
          >
            {t("profile.save_change")}
          </Button>
        </div>
      </div>
    </MainLayout>
  );
};

export default withTranslation()(UpdateProfile);
