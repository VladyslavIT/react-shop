import React from 'react';
import { Route, Routes } from "react-router-dom";

import {ROUTES} from '../../pages/routes';

import Home from '../Home/Home';
import SingleProduct from 'components/Products/SingleProduct';

const AppRoutes = () => (
  <Routes>
    <Route path='/' index element={<Home />} />
    <Route path={ROUTES.PRODUCT} element={<SingleProduct/>}/>
  </Routes>
);

export default AppRoutes;
