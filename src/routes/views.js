import { lazy } from "react";

export const Login = lazy(() => import("views/Login"));
export const Overview = lazy(() => import("views/Overview"));
export const Register = lazy(() => import("views/Register"));
export const ResetPassword = lazy(() => import("views/ResetPassword/containers/ResetPassword"));
export const ResetPasswordResult = lazy(() =>
  import("views/ResetPassword/containers/ResetPasswordResult"),
);

export const ScheduleMeetingHistories = lazy(() =>
  import("views/ScheduleMeeting/containers/Histories"),
);
export const ScheduleMeetingItem = lazy(() => import("views/ScheduleMeeting/containers/New"));
export const ScheduleMeetingDetail = lazy(() => import("views/ScheduleMeeting/containers/Detail"));
export const ScheduleMeetingView = lazy(() => import("views/ScheduleMeeting/containers/View"));
export const VerifyResetPassword = lazy(() => import("views/VerifyResetPassword"));
export const Rewards = lazy(() => import("views/Rewards"));
export const ComingSoon = lazy(() => import("views/Common/ComingSoon"));
export const ProfileChangePassword = lazy(() => import("views/Profile/containers/ChangePassword"));
export const ProfileUpdate = lazy(() => import("views/Profile/containers/UpdateProfile"));
export const MeetingRedirect = lazy(() => import("views/MeetingRedirect"));
