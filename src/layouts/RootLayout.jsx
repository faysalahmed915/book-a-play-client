import React from 'react';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import { Outlet } from 'react-router';

const RootLayout = () => {
    return (
        <div className='flex flex-col min-h-screen'>
            <Navbar></Navbar>
            <div className='min-h-[calc(100vh-284px)]'>
                <Outlet></Outlet>
            </div>
        <Footer></Footer>
        </div>
    );
};

export default RootLayout;