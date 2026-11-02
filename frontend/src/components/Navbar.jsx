
import React, { useEffect, useRef, useState } from 'react';
import logo from '../assets/image.png';
import { CiLight } from 'react-icons/ci';
import { MdOutlineDarkMode, MdOutlineBolt, MdDashboard, MdKeyboardArrowRight } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FaAngleDown } from "react-icons/fa";
import { MdLogout } from "react-icons/md";
import { logout } from '../services/login';
import { FiArrowRight } from 'react-icons/fi';

const Navbar = () => {
    const [isdark, setdark] = useState(true);
    const dispatch = useDispatch();
    const { userData } = useSelector((state) => state.user);
    const [menuopen, setmenuopen] = useState(false);

    const name = userData?.name || 'Guest';
    const initialLetters = name.trim().split(/\s+/).filter(Boolean).map((word) => word[0]).join('').slice(0, 2).toUpperCase() || 'G';

    const email = userData?.email || "xyz@email.com";
    const navigate = useNavigate();

    useEffect(() => {}, [userData]);

    const ref = useRef();

    useEffect(() => {
        const handleclickoutside = (event) => {
            if (ref.current && !ref.current.contains(event.target)) {
                setmenuopen(false);
            }
        };

        document.addEventListener('mousedown', handleclickoutside);

        return () => {
            document.removeEventListener('mousedown', handleclickoutside);
        };
    }, []);

    useEffect(() => {
        const theme = window.localStorage.getItem('theme');
        const darkvalue = theme ? theme === 'dark' : true;
        document.documentElement.classList.toggle('dark', darkvalue);
        setdark(darkvalue);
    }, []);

    const toggletheme = () => {
        const newval = !isdark;
        setdark(newval);
        document.documentElement.classList.toggle('dark', newval);
        window.localStorage.setItem('theme', newval ? 'dark' : 'light');
    };

    const logouthandle = async () => {
        try {
            await logout(dispatch);
            setmenuopen(false);
        } catch (e) {
            console.log("something went wrong while logout");
        }
    };

    return (
        <div className="relative z-20 mx-2 mt-2 flex h-[64px] w-[calc(100%-1rem)] items-center justify-between gap-2 rounded-2xl border border-white/60 bg-white/70 px-2.5 font-sans shadow-xl shadow-slate-900/5 backdrop-blur-2xl transition-all duration-300 dark:border-white/10 dark:bg-slate-950/70 sm:mx-5 sm:mt-3 sm:h-[76px] sm:w-[calc(100%-2.5rem)] sm:gap-3 sm:px-7">

            <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl">
                <div className="absolute -left-16 -top-20 h-40 w-40 rounded-full bg-blue-500/10 blur-3xl" />
                <div className="absolute -right-16 -bottom-20 h-40 w-40 rounded-full bg-violet-500/10 blur-3xl" />
            </div>

            {/* Logo */}
            <div
                onClick={() => navigate('/')}
                className="relative flex min-w-0 shrink items-center gap-1.5 cursor-pointer sm:gap-3"
            >
                <div className="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-blue-500/20 bg-gradient-to-br from-blue-500/10 to-violet-500/10 shadow-sm transition-transform duration-300 hover:scale-105 sm:h-11 sm:w-11">
                    <img src={logo} alt="DevSpace logo" className="h-full w-full object-contain" />
                </div>

                <span className="bg-gradient-to-r from-blue-600 via-indigo-500 to-violet-600 bg-clip-text text-lg font-extrabold tracking-tight text-transparent sm:text-3xl">
                    DevSpace
                </span>
            </div>

            {/* Right Section */}
            <div ref={ref} className="relative flex shrink-0 items-center gap-1.5 sm:gap-4">

                {/* Theme Toggle */}
                <button
                    type="button"
                    onClick={toggletheme}
                    aria-label={isdark ? 'Switch to light mode' : 'Switch to dark mode'}
                    title={isdark ? 'Light mode' : 'Dark mode'}
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-slate-200/80 bg-white/70 text-slate-700 shadow-sm transition-all duration-300 hover:scale-105 hover:border-blue-400 hover:bg-blue-50 hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500/40 dark:border-white/10 dark:bg-white/5 dark:text-amber-300 dark:hover:border-violet-400 dark:hover:bg-violet-500/10 sm:h-10 sm:w-10"
                >
                    {isdark ? <CiLight className="text-2xl" /> : <MdOutlineDarkMode className="text-xl" />}
                </button>

                {
                    userData == null ?

                        <div className="flex shrink-0 items-center gap-1.5 sm:gap-3">

                            <button
                                onClick={() => navigate('/login')}
                                className="group relative overflow-hidden rounded-full bg-blue-600 px-3 py-2 text-xs font-medium text-white sm:ml-5 sm:px-8 sm:py-3 sm:text-base"
                            >
                                <span className="relative z-10 text-white dark:group-hover:text-black">
                                    Login
                                </span>

                                <span className="absolute left-0 top-0 h-[390%] w-0 -translate-x-1/2 -translate-y-1/2 rotate-45 bg-gray-700 transition-all duration-1000 group-hover:w-[200%] dark:bg-white/80"></span>
                            </button>

                            <button
                                onClick={() => navigate('/login')}
                                className="group flex items-center gap-1 rounded-full bg-white px-3 py-2 text-xs font-bold text-slate-950 shadow-lg transition hover:-translate-y-0.5 hover:bg-violet-100 sm:gap-2 sm:px-5 sm:py-2.5 sm:text-sm"
                            >
                                <span>Get started</span>
                                <FiArrowRight className="shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                            </button>

                        </div>

                        :

                        <div className="flex items-center">

                            <div className="hidden h-8 w-px bg-slate-200 dark:bg-white/10 sm:block" />

                            {/* Profile */}
                            <div
                                onClick={() => setmenuopen(!menuopen)}
                                className="relative flex cursor-pointer items-center gap-1.5 rounded-xl px-1 py-1 transition-colors duration-200 hover:bg-gray-200 dark:hover:bg-white/5 sm:gap-3 sm:px-3"
                            >

                                <div className="h-9 w-9 shrink-0 rounded-full bg-gradient-to-br from-blue-500 via-indigo-500 to-violet-600 p-[2px] shadow-md shadow-indigo-500/20 sm:h-10 sm:w-10">
                                    <div className="flex h-full w-full items-center justify-center rounded-full bg-white text-sm font-bold text-indigo-700 dark:bg-slate-950 dark:text-indigo-300">
                                        {initialLetters}
                                    </div>
                                </div>

                                <div className="flex min-w-0 items-center gap-1 sm:gap-2">

                                    <div className="min-w-0">
                                        <p className="max-w-[75px] truncate text-xs font-semibold text-slate-800 dark:text-slate-100 sm:max-w-32 sm:text-sm">
                                            {name.split(/\s+/)[0]}
                                        </p>

                                        <p className="hidden text-xs font-medium text-slate-500 dark:text-slate-400 sm:block">
                                            Developer
                                        </p>
                                    </div>

                                    <div className={`flex shrink-0 items-center text-xs text-slate-900 transition-transform duration-200 dark:text-gray-400 ${menuopen ? "rotate-180" : "rotate-0"}`}>
                                        <FaAngleDown />
                                    </div>

                                </div>
                            </div>

                        </div>
                }

                {/* Profile Dropdown */}
                {
                    menuopen && (
                        <div
                            className="
                                absolute right-0 top-[calc(100%+14px)] z-50
                                w-[min(260px,calc(100vw-24px))]
                                origin-top-right
                                rounded-2xl
                                border border-gray-200 dark:border-gray-700
                                bg-white/95 dark:bg-gray-900/95
                                p-4
                                shadow-2xl shadow-black/10 dark:shadow-black/40
                                backdrop-blur-xl
                            "
                        >

                            {/* Profile Section */}
                            <div className="flex flex-col items-center pb-4">

                                <div className="h-16 w-16 rounded-full bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-[2px] shadow-lg shadow-indigo-500/20">
                                    <div className="flex h-full w-full items-center justify-center rounded-full bg-white text-xl font-bold text-indigo-600 dark:bg-gray-950 dark:text-indigo-300">
                                        {initialLetters}
                                    </div>
                                </div>

                                <p className="mt-3 max-w-full truncate text-base font-semibold text-gray-900 dark:text-white">
                                    {name}
                                </p>

                                <p className="mt-0.5 max-w-full truncate text-sm text-gray-500 dark:text-gray-400">
                                    {email}
                                </p>

                            </div>

                            <div className="border-t border-gray-200 pt-3 dark:border-gray-700">

                                {/* Dashboard */}
                                <button
                                    onClick={() => {
                                        navigate("/dashboard/project");
                                        setmenuopen(false);
                                    }}
                                    className="
                                        group flex w-full items-center gap-3
                                        rounded-xl px-3 py-3
                                        text-gray-700 dark:text-gray-200
                                        transition-all duration-200
                                        hover:bg-gray-100 dark:hover:bg-gray-800
                                    "
                                >

                                    <span className="
                                        flex h-9 w-9 shrink-0 items-center justify-center
                                        rounded-lg bg-gray-100 dark:bg-gray-800
                                        text-gray-600 dark:text-gray-300
                                        transition-colors
                                        group-hover:bg-indigo-100 group-hover:text-indigo-600
                                        dark:group-hover:bg-indigo-500/20 dark:group-hover:text-indigo-300
                                    ">
                                        <MdDashboard size={19} />
                                    </span>

                                    <span className="flex-1 text-left text-sm font-medium">
                                        Dashboard
                                    </span>

                                    <MdKeyboardArrowRight className="text-gray-400 transition-transform group-hover:translate-x-1" size={20} />

                                </button>

                                {/* Logout */}
                                <button
                                    onClick={logouthandle}
                                    className="
                                        group mt-1 flex w-full items-center gap-3
                                        rounded-xl px-3 py-3
                                        text-red-500 dark:text-red-400
                                        transition-all duration-200
                                        hover:bg-red-50 dark:hover:bg-red-500/10
                                    "
                                >

                                    <span className="
                                        flex h-9 w-9 shrink-0 items-center justify-center
                                        rounded-lg bg-red-50 dark:bg-red-500/10
                                    ">
                                        <MdLogout size={18} />
                                    </span>

                                    <span className="text-sm font-semibold">
                                        Logout
                                    </span>

                                </button>

                            </div>
                        </div>
                    )
                }

            </div>
        </div>
    );
};

export default Navbar;
