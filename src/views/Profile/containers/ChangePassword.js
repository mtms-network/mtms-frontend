import React, { useState, useMemo } from "react";
import { Button, GroupLayout, GroupTitle, Input, MainLayout } from "components";
import { IoTv } from "react-icons/io5";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { routeUrls, API_RESPONSE_STATUS, LIVE_URL } from "configs";
import { handleHttpError } from "helpers";
import { useNavigate } from "react-router-dom";
import { withTranslation } from "react-i18next";
import { changePassword } from "services";
import { message } from "antd";
import { useAppStore } from "stores/app.store";

const ChangePassword = ({ t }) => {
  const [appStore] = useAppStore();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const user = useMemo(() => appStore.user, [appStore.user]);

  const schema = yup
    .object()
    .shape({
      oldPassword: yup.string().required("Old password is required"),
      password: yup.string().required("Password is required"),
      confirmPassword: yup
        .string()
        .oneOf([yup.ref("password"), null], "Passwords must match")
        .required("Confirm Password is required"),
    })
    .required();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (values) => {
    if (values.password) {
      try {
        setLoading(true);
        const res = await changePassword({ ...values });
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
    }
  };

  const onForgetPassword = () => {
    navigate(`/${routeUrls.reset.path}`);
  };

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
              <img
                className="w-[100px] h-[100px] rounded-full object-cover"
                alt="avatar"
                src={`${LIVE_URL}${user?.profile?.avatar}`}
              />
              <p className="pt-3 font-bold">{user?.username}</p>
            </div>
            <div className="w-full h-auto pt-10">
              <Input
                type="password"
                className="w-full"
                labelClassName="text-base"
                register={register("oldPassword")}
                label="Old password"
                placeholder="********"
                error={errors.oldPassword}
              />
            </div>
            <div className="w-full h-auto pt-4">
              <Input
                type="password"
                className="w-full"
                labelClassName="text-base"
                register={register("password")}
                label="New password"
                placeholder="********"
                error={errors.password}
              />
            </div>
            <div className="w-full h-auto pt-4">
              <Input
                type="password"
                className="w-full"
                labelClassName="text-base"
                register={register("confirmPassword")}
                label="Confirm password"
                placeholder="********"
                error={errors.confirmPassword}
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
            {t("user.change_password")}
          </Button>
        </div>
      </div>
    </MainLayout>
  );
};

export default withTranslation()(ChangePassword);
