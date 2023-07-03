import React, { useEffect } from 'react';

import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';

import { getCategories } from 'redux/categories/categoriesSlice';
import { getProducts } from 'redux/products/productsSlice';

import AppRoutes from './Routes/Routes';
import Header from './Header/Header';
import Footer from './Footer/Footer';
import Sidebar from './Sidebar/Sidebar';
import UserForm from './User/UserForm';

const App = () => {
  const dispatch = useDispatch();

  const location = useLocation();

  const isRowContainer = location.pathname.startsWith('/products/');

  useEffect(() => {
    dispatch(getCategories());
    dispatch(getProducts());
  }, [dispatch]);

  return (
    <div className="app">
      <Header />
      <UserForm/>
      <div className={isRowContainer ? 'row-container' : 'container'}>
        <Sidebar />
        <AppRoutes />
      </div>
      <Footer />
    </div>
  );
};

export default App;
