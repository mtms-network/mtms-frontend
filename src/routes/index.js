import { BrandLogoLoading } from "components";
import { routeUrls } from "configs";
import React, { Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Login, Overview, Register, ResetPassword } from "views";

const Routers = () => {
  return (
    <Suspense fallback={<BrandLogoLoading />}>
      <Routes>
        <Route path={`/${routeUrls.login.path}`} element={<Login />} />
        <Route path={`/${routeUrls.register.path}`} element={<Register />} />
        <Route path={`/${routeUrls.reset.path}`} element={<ResetPassword />} />
        <Route index element={<Overview />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Suspense>
  );
};

export default Routers;
