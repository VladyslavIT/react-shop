import { ROUTES } from 'pages/routes';
import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetProductQuery } from 'redux/api/apiSlice';
import Product from './Product';

const SingleProduct = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const { data, isLoading, isFetching, isSuccess } = useGetProductQuery({ id });
  // const {images, title, price, description} = data;
  // console.log(data.title);

  useEffect(() => {
    if (!isLoading && !isFetching && !isSuccess) {
      navigate(ROUTES.HOME);
    }
  }, [isLoading, isFetching, isSuccess]);
  console.log(data);

  return !data ? (
    <section className='preloader'> Loading...</section>
  ) : (
    <div>
      <Product {...data} />
    </div>
  );
};

export default SingleProduct;
