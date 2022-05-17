import { lazy } from "react";

export const Login = lazy(() => import("views/Login"));
export const Overview = lazy(() => import("views/Overview"));
export const Register = lazy(() => import("views/Register"));
export const ResetPassword = lazy(() => import("views/ResetPassword"));
export const ScheduleMeetingHistories = lazy(() =>
  import("views/ScheduleMeeting/containers/Histories"),
);
export const ScheduleMeetingItem = lazy(() => import("views/ScheduleMeeting/containers/New"));
export const VerifyResetPassword = lazy(() => import("views/VerifyResetPassword"));
