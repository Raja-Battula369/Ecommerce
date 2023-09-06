import { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const RouterProtecter = () => {
  const token = useSelector((state) => state.Token);
  return (
    <Fragment>{token ? <Outlet /> : <Navigate to={'/signin'} />}</Fragment>
  );
};

export default RouterProtecter;
