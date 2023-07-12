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
    list: productList,
    filtered: filteredProducts,
    categories,
  } = useSelector(state => ({
    list: state.products.list,
    filtered: state.products.filtered,
    categories: state.categories,
  }));

  useEffect(() => {
    if (!productList.length) {
      return;
    }
    dispatch(filterByPrice(100));
  }, [dispatch, productList.length]);

  return (
    <>
      <Poster />
      <Products products={productList} amount={5} title="Trending" />
      <Categories products={categories.list} amount={5} title="Worth seeing" />
      <Banner />
      <Products products={filteredProducts} amount={5} title="Less than 100$" />
    </>
  );
};


export default Home;
