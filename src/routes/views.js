import { lazy } from "react";

export const Login = lazy(() => import("views/Login"));
export const Meeting = lazy(() => import("views/Meeting"));
export const Register = lazy(() => import("views/Register"));
export const RegisterResult = lazy(() => import("views/Register/RegisterResult"));
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
export const VerifyActiveToken = lazy(() => import("views/VerifyActiveToken"));
export const Rewards = lazy(() => import("views/Rewards"));
export const ComingSoon = lazy(() => import("views/Common/ComingSoon"));
export const ProfileChangePassword = lazy(() => import("views/Profile/containers/ChangePassword"));
export const ProfileUpdate = lazy(() => import("views/Profile/containers/UpdateProfile"));
export const MeetingRedirect = lazy(() => import("views/MeetingRedirect"));
export const VerifyActiveTokenResult = lazy(() =>
  import("views/VerifyActiveToken/VerifyCodeResult"),
);
export const ConnectWallet = lazy(() => import("views/ConnectWallet"));
export const Overview = lazy(() => import("views/Overview"));
export const ListContact = lazy(() => import("views/Contact/containers/ListContact"));
export const NewContact = lazy(() => import("views/Contact/containers/NewContact"));
export const ToDoList = lazy(() => import("views/ToDo/containers/ListTodo"));
export const NewTodo = lazy(() => import("views/ToDo/containers/New"));


