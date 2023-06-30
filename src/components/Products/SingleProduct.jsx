import { ROUTES } from 'pages/routes';
import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetProductQuery } from 'redux/api/apiSlice';
import Product from './Product';
import Products from './Products';
import { useDispatch, useSelector } from 'react-redux';
import { getRelatedProducts } from 'redux/products/productsSlice';

const SingleProduct = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { data, isLoading, isFetching, isSuccess } = useGetProductQuery({ id });

  const { related } = useSelector(({ products }) => products);

  useEffect(() => {
    if (!isLoading && !isFetching && !isSuccess) {
      navigate(ROUTES.HOME);
    }
  }, [isLoading, isFetching, isSuccess]);

  useEffect(() => {
    if (data) {
      dispatch(getRelatedProducts(data.category.id));
    }
  }, [data]);

  return !data ? (
    <section className="preloader"> Loading...</section>
  ) : (
    <>
    <div>
      <Product {...data} />
      <Products products={related} amount={5} title='Related products'/>
    </div>
   
    </>
  );
};

export default SingleProduct;
