import { BrandLogoLoading } from "components";
import { routeUrls } from "configs";
import React, { Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import {
  Login,
  Overview,
  Register,
  ResetPassword,
  ScheduleMeetingHistories,
  ScheduleMeetingItem,
  VerifyResetPassword,
  ScheduleMeetingDetail,
  Profile,
} from "./views";

const Routers = () => {
  return (
    <Suspense fallback={<BrandLogoLoading />}>
      <Routes>
        <Route path={`/${routeUrls.login.path}`} element={<Login />} />
        <Route path={`/${routeUrls.register.path}`} element={<Register />} />
        <Route path={`/${routeUrls.reset.path}`} element={<ResetPassword />} />
        <Route path={`/${routeUrls.verifyForgotPassword.path}`} element={<VerifyResetPassword />} />
        <Route path={`/${routeUrls.scheduleMeeting.path}`} element={<ScheduleMeetingHistories />} />
        <Route path={`/${routeUrls.newScheduleMeeting.path}`} element={<ScheduleMeetingItem />} />
        <Route path={`/meeting/:mettingId`} element={<ScheduleMeetingDetail />} />
        <Route path={`/${routeUrls.profile.path}`} element={<Profile />} />
        <Route index element={<Overview />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Suspense>
  );
};

export default Routers;
