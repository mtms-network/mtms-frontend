import { BrandLogoLoading } from "components";
import { routeUrls } from "configs";
import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { Login, Register } from "views";

const Routers = () => {
  return (
    <Suspense fallback={<BrandLogoLoading />}>
      <Routes>
        <Route index element={<Login />} />
        <Route path={`/${routeUrls.register.path}`} element={<Register />} />
      </Routes>
    </Suspense>
  );
};

export default Routers;
