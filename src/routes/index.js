import { BrandLogoLoading } from "components";
import { routeUrls } from "configs";
import React, { Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Login, Register, ResetPassword } from "views";

const Routers = () => {
  return (
    <Suspense fallback={<BrandLogoLoading />}>
      <Routes>
        <Route index element={<Login />} />
        <Route path={`/${routeUrls.register.path}`} element={<Register />} />
        <Route path={`/${routeUrls.reset.path}`} element={<ResetPassword />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  );
};

export default Routers;
