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

  const { list, related } = useSelector(({ products }) => products);

  useEffect(() => {
    if (!isFetching && !isLoading && !isSuccess) {
      navigate(ROUTES.HOME);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading, isFetching, isSuccess]);

  useEffect(() => {
    if (!data || !list.length) return;

    dispatch(getRelatedProducts(data.category.id));
  }, [data, dispatch, list.length]);

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
