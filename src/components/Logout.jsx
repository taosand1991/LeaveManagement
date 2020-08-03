import React from 'react';

const Logout = ({history}) => {
    localStorage.removeItem('token');
    window.location = '/';
    return null
};

export default Logout;