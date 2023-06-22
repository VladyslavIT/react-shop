import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Banner from 'components/Banner/Banner';
import Categories from 'components/Categories/Categories';
import Poster from 'components/Poster/Poster';
import Products from 'components/Products/Products';
import { filterByPrice } from 'redux/products/productsSlice';

const Home = () => {
  const dispatch = useDispatch();

  const {
    products: { list, filtered },
    categories,
  } = useSelector(state => state);

  useEffect(() => {
    if (!list.length) {
      return;
    }
    dispatch(filterByPrice(100));
  }, [dispatch, list.length]);

  return (
    <>
      <Poster />
      <Products products={list} amount={5} title="Trending" />
      <Categories products={categories.list} amount={5} title="Worth seeing" />
      <Banner />
      <Products products={filtered} amount={5} title="Less than 100$" />
    </>
  );
};

export default Home;
