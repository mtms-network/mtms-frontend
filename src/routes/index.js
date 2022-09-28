import { BrandLogoLoading } from "components";
import { routeParts, routeUrls } from "configs";
import React, { Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import {
  Login,
  Meeting,
  Register,
  ResetPassword,
  ScheduleMeetingHistories,
  ScheduleMeetingItem,
  VerifyResetPassword,
  ScheduleMeetingDetail,
  ComingSoon,
  ResetPasswordResult,
  ScheduleMeetingView,
  Rewards,
  ProfileChangePassword,
  ProfileUpdate,
  MeetingRedirect,
  VerifyActiveToken,
  RegisterResult,
  VerifyActiveTokenResult,
  ConnectWallet,
  Overview,
} from "./views";
import Contact from "../views/Contact";
import ToDoList from "../views/ToDo/containers/List";
import NewTodo from "../views/ToDo/containers/New";

const Routers = () => {
  return (
    <Suspense
      fallback={
        <div className="h-screen">
          <BrandLogoLoading />
        </div>
      }
    >
      <Routes>
        <Route path={`/${routeUrls.login.path}`} element={<Login />} />
        <Route path={`/${routeUrls.register.path}`} element={<Register />} />
        <Route path={`/${routeUrls.registerResult.path}`} element={<RegisterResult />} />
        <Route path={`/${routeUrls.reset.path}`} element={<ResetPassword />} />
        <Route path={`/${routeUrls.resetResult.path}`} element={<ResetPasswordResult />} />
        <Route path={`/${routeUrls.verifyForgotPassword.path}`} element={<VerifyResetPassword />} />
        <Route path={`/${routeUrls.verifyActiveToken.path}`} element={<VerifyActiveToken />} />
        <Route
          path={`/${routeUrls.verifyActiveTokenResult.path}`}
          element={<VerifyActiveTokenResult />}
        />
        <Route path={`/${routeUrls.comingSoon.path}`} element={<ComingSoon />} />
        <Route path={`/${routeUrls.scheduleMeeting.path}`} element={<ScheduleMeetingHistories />} />
        <Route path={`/${routeUrls.scheduleMeeting.path}/new`} element={<ScheduleMeetingItem />} />
        <Route
          path={`/${routeUrls.scheduleMeeting.path}/:meetingId`}
          element={<ScheduleMeetingDetail />}
        />
        <Route
          path={`/${routeUrls.scheduleMeeting.path}/:meetingId/${routeParts.duplicate.path}`}
          element={<ScheduleMeetingDetail />}
        />
        <Route
          path={`/${routeUrls.scheduleMeeting.path}/view/:meetingId`}
          element={<ScheduleMeetingView />}
        />
        <Route
          path={`/${routeUrls.profileChangePassword.path}`}
          element={<ProfileChangePassword />}
        />
        <Route path={`/${routeUrls.profileUpdate.path}`} element={<ProfileUpdate />} />
        <Route path={`/${routeUrls.rewards.path}`} element={<Rewards />} />
        <Route
          path={`/${routeUrls.meetingRedirect.path}/:meetingId`}
          element={<MeetingRedirect />}
        />
        <Route path={`/${routeUrls.connectWallet.path}`} element={<ConnectWallet />} />
        <Route path={`/${routeUrls.meeting.path}`} element={<Meeting />} />
        <Route path={`/${routeUrls.contact.path}`} element={<Contact />} />
        <Route path={`/${routeUrls.todo.path}`} element={<ToDoList />} />
        <Route path={`/${routeUrls.newTodo.path}`} element={<NewTodo />} />

        <Route path="/" element={<Overview />} />
        <Route path="*" element={<Navigate to="/meeting" />} />
      </Routes>
    </Suspense>
  );
};

export default Routers;
