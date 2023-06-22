import { ROUTES } from 'pages/routes';
import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetProductQuery } from 'redux/api/apiSlice';

const SingleProduct = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const { data, isLoading, isFetching, isSuccess } = useGetProductQuery({ id });

  useEffect(() => {
    if(!isLoading && !isFetching && !isSuccess) {
        navigate(ROUTES.HOME);
    }
  }, [isLoading, isFetching, isSuccess]);
  console.log(data);

  return <div>SingleProduct</div>;
};

export default SingleProduct;
