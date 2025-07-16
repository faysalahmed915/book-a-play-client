import React from 'react';
import { Link } from 'react-router';

const Logo = () => {
    return (
        <div>
            <Link to='/'>
                <img className='w-32' src="/src/assets/logo-5.png" alt="" />
            </Link>
        </div>
    );
};

export default Logo;