import React from 'react';
import useAuth from '../hooks/useAuth';
import Loading from '../components/Loading/Loading';
import useRole from '../hooks/useRole';
import Forbidden from '../components/Forbidden/Forbidden';

const AdminRoute = ({ children }) => {
    const { loading } = useAuth();
    const { role, roleLoading } = useRole()

    if (loading || roleLoading) {
        return <Loading></Loading>
    }

    if (role !== 'admin') {
        return <Forbidden></Forbidden>
    }

    return children;
};

export default AdminRoute;