import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { authorizedContext } from '../AuthProvider/AuthProvider';

const PrivateRoute = ({ children }) => {
    const { pathname } = useLocation();
  const { user, loading } = useContext(authorizedContext);

  if (loading) {
    return (
      <div className="flex justify-center">
       <h1 className='text-center text-xl'>Loading....</h1>
      </div>
    );
  }

  if (user) {
    return children;
  }
    return (
        <div>
        <Navigate state={pathname} to="/login"></Navigate>
      </div>
    );
};

export default PrivateRoute;