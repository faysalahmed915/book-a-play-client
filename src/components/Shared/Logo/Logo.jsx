import React from 'react';
import { Link } from 'react-router';

const Logo = () => {
    return (
        <Link to='/'>
            <div className='flex flex-wrap items-center gap-2 justify-start'>
                <img className='w-12 rounded-full' src="/src/assets/logo-6.png" alt="" />
                <h3 className='lg:block font-bold text-2xl text-primary'>BookaPlay</h3>
            </div>
        </Link>
    );
};

export default Logo;