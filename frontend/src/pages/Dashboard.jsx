
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../services/login';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import { Outlet, useLocation } from 'react-router-dom';
import { FiMenu, FiX } from 'react-icons/fi';

const Dashboard = () => {
    const dispatch = useDispatch();
    const { userData } = useSelector(state => state.user);

    const [sidebarOpen, setSidebarOpen] = useState(false);
    const location = useLocation();

    // Close mobile sidebar whenever route changes
    useEffect(() => {
        setSidebarOpen(false);
    }, [location.pathname]);

    const logouthandle = async () => {
        try {
            await logout(dispatch);
        } catch (e) {
            console.log("something went wrong while logout");
        }
    };

    return (
        <div className='relative flex h-screen w-full flex-col overflow-hidden bg-slate-100 transition-colors duration-200 dark:bg-black'>

            <Navbar />

            <div className='pointer-events-none absolute -top-38 left-1/3 hidden h-[600px] w-[650px] rounded-full bg-blue-600/80 blur-[400px] dark:blur-[500px] lg:block' />

            <div className='relative flex min-h-0 flex-1'>

                {/* Mobile Sidebar Backdrop */}
                {sidebarOpen && (
                    <div
                        onClick={() => setSidebarOpen(false)}
                        className='absolute inset-0 z-30 bg-black/40 backdrop-blur-[2px] lg:hidden'
                    />
                )}

                {/* Sidebar */}
                <div
                    className={`
                        absolute inset-y-0 left-0 z-40
                        h-full
                        transition-transform duration-300 ease-in-out
                        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
                        lg:relative lg:inset-auto lg:z-auto
                        lg:translate-x-0
                    `}
                >
                    <Sidebar />
                </div>

                {/* Main Content */}
                <div className='flex h-full min-h-0 min-w-0 flex-1 flex-col overflow-hidden'>

                    {/* Mobile Hamburger */}
                    <div className='flex shrink-0 items-center px-3 pt-3 lg:hidden'>
                        <button
                            type='button'
                            onClick={() => setSidebarOpen(!sidebarOpen)}
                            aria-label={sidebarOpen ? 'Close sidebar' : 'Open sidebar'}
                            className='flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 shadow-sm transition-all hover:bg-slate-100 dark:border-white/10 dark:bg-slate-900 dark:text-white dark:hover:bg-slate-800'
                        >
                            {sidebarOpen
                                ? <FiX size={21} />
                                : <FiMenu size={21} />
                            }
                        </button>

                        <span className='ml-3 text-sm font-semibold text-slate-700 dark:text-slate-200'>
                            Menu
                        </span>
                    </div>

                    {/* Outlet */}
                    <div className='h-full z-0 min-h-0 min-w-0 flex-1 overflow-y-auto p-3 sm:p-5 md:p-6 lg:p-8
                        [scrollbar-width:thin]
                        [scrollbar-color:rgba(100,116,139,0.35)_transparent]
                        [&::-webkit-scrollbar]:w-2
                        [&::-webkit-scrollbar-track]:bg-transparent
                        [&::-webkit-scrollbar-thumb]:rounded-full
                        [&::-webkit-scrollbar-thumb]:border-2
                        [&::-webkit-scrollbar-thumb]:border-solid
                        [&::-webkit-scrollbar-thumb]:border-transparent
                        [&::-webkit-scrollbar-thumb]:bg-slate-300
                        hover:[&::-webkit-scrollbar-thumb]:bg-slate-400
                        dark:[&::-webkit-scrollbar-thumb]:bg-white/10
                        dark:hover:[&::-webkit-scrollbar-thumb]:bg-white/20'>

                        <Outlet />

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
