import Poster from 'components/Poster/Poster';
import Products from 'components/Products/Products';
import React from 'react';
import { useSelector } from 'react-redux';


const Home = () => {
  const {list} = useSelector(({products}) => products)

  return <>
  <Poster/>
  <Products products={list} amount={5} title="Trending"/>
  </>
};

export default Home;
