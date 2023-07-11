import React from 'react';
import { Route, Routes } from "react-router-dom";

import {ROUTES} from '../../pages/routes';

import Home from '../Home/Home';
import SingleProduct from 'components/Products/SingleProduct';
import Profile from 'components/Profile/Profile';

const AppRoutes = () => (
  <Routes>
    <Route path='/' index element={<Home />} />
    <Route path={ROUTES.PRODUCT} element={<SingleProduct/>}/>
    <Route path={ROUTES.PROFILE} element={<Profile/>}/>
  </Routes>
);

export default AppRoutes;
