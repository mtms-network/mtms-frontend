import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Login } from 'views';

const Routers = () => {
  return (
    <Routes>
      <Route index element={<Login />} />
    </Routes>
  );
};

export default Routers;
