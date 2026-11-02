import { signInWithPopup } from 'firebase/auth';
import React from 'react'
import { FcGoogle } from "react-icons/fc";
import { auth, googleProvider } from '../../firebase';
import { googlelogin } from '../services/login';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setuserData } from '../redux/userslice';
import Dashboard from './Dashboard';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';


import {
    FiCode,
    FiTerminal,
    FiCloud,
    FiZap,
    FiCheckCircle,
    FiFolder,
    FiGitBranch
} from "react-icons/fi";
const Login = () => {
    const [loading, setloading] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handlegooglelogin = async () => {
        setloading(true);

        try {
            const result = await signInWithPopup(auth, googleProvider);
            const token = await result.user.getIdToken();
            const data = await googlelogin(token);
            if(data){
                dispatch(setuserData(data));
                navigate('/dashboard/project');
            }

        } catch (error) {
            if (error.code === "auth/popup-closed-by-user") {
                console.log("User closed the Google login popup");
            } else {
                console.error("Google login failed:", error);
            }
        } finally {
            setloading(false);
        }
    }


    return (
        <>
        <div className='absolute w-full'>
       <Navbar/>
        </div>
 
    <div className="flex gap-5 py-4 px-5 flex pt-30 min-h-screen w-full bg-white transition-colors duration-300 dark:bg-[#080b14]">

        <div className="relative  rounded-3xl flex min-h-screen w-full items-center justify-center overflow-hidden px-6 pt-10 w-full pb-3 lg:w-[45%]">

            
            <div className="pointer-events-none absolute -left-32 top-10 h-72 w-72 rounded-full bg-orange-400/10 blur-[100px]" />

            <div className="relative z-10 w-full max-w-[390px]">

                
                <div className="mb-12">
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500 to-orange-700 shadow-lg shadow-orange-500/20">
                        <FiCode className="text-2xl text-white" />
                    </div>

                    <p className="text-2xl font-bold tracking-tight text-slate-950 dark:text-white">
                        <span className="text-orange-600">D</span>ev
                        <span className="text-orange-600">S</span>pace
                    </p>
                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                        Your workspace. Your code. Your flow.
                    </p>
                </div>
                <div className="mb-9">
                    <h1 className="text-3xl font-bold tracking-tight text-slate-950 dark:text-white sm:text-4xl">
                        Welcome back
                    </h1>

                    <p className="mt-3 text-sm leading-6 text-slate-500 dark:text-slate-400">
                        Your next great idea starts here. Sign in to access your projects and continue building.
                    </p>
                </div>
                <button
                    disabled={loading}
                    onClick={handlegooglelogin}
                    className="group flex w-full items-center justify-center gap-3 rounded-xl border border-slate-200 bg-white px-5 py-3.5 text-sm font-semibold text-slate-700 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-60 dark:border-white/10 dark:bg-white/[0.05] dark:text-white dark:hover:bg-white/[0.09]"
                >
                    <FcGoogle className="text-xl" />
                    {loading ? "Signing in..." : "Continue with Google"}
                </button>

                {/* Divider */}
                <div className="my-7 flex items-center gap-4">
                    <div className="h-px flex-1 bg-slate-200 dark:bg-white/10" />
                    <span className="text-[11px] font-semibold tracking-widest text-slate-400">
                        SECURE SIGN IN
                    </span>
                    <div className="h-px flex-1 bg-slate-200 dark:bg-white/10" />
                </div>

                <div className="flex items-start gap-3 rounded-xl border border-slate-100 bg-slate-50 p-4 dark:border-white/[0.06] dark:bg-white/[0.03]">
                    <FiCheckCircle className="mt-0.5 shrink-0 text-lg text-emerald-500" />
                    <div>
                        <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                            Your workspace stays yours
                        </p>
                        <p className="mt-1 text-xs leading-5 text-slate-500 dark:text-slate-400">
                            Sign in securely with Google and get back to your development workflow.
                        </p>
                    </div>
                </div>

                <p className="mt-8 text-center text-xs leading-6 text-slate-400 dark:text-slate-500">
                    By continuing, you agree to our{" "}
                    <span className="cursor-pointer font-medium text-slate-600 hover:text-orange-600 dark:text-slate-300">
                        Terms & Conditions
                    </span>
                    {" "}and{" "}
                    <span className="cursor-pointer font-medium text-slate-600 hover:text-orange-600 dark:text-slate-300">
                        Privacy Policy
                    </span>.
                </p>

                <p className="mt-8 text-center text-xs text-slate-400 dark:text-slate-600">
                    © {new Date().getFullYear()} DevSpace. Built for developers.
                </p>
            </div>
        </div>

        

<div className="relative hidden min-h-screen flex-1 items-center justify-center overflow-hidden bg-[#0b1020] lg:flex rounded-2xl">

    {/* Subtle background gradients */}
    <div className="absolute -right-32 -top-32 h-[500px] w-[500px] rounded-full bg-indigo-600/15 blur-[140px]" />
    <div className="absolute -bottom-40 -left-32 h-[500px] w-[500px] rounded-full bg-orange-500/10 blur-[140px]" />

    {/* Minimal background grid */}
    <div
        className="absolute inset-0 opacity-[0.08]"
        style={{
            backgroundImage:
                "linear-gradient(rgba(255,255,255,.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.15) 1px, transparent 1px)",
            backgroundSize: "55px 55px"
        }}
    />

    <div className="relative z-10 mx-auto max-w-xl px-10 text-center">

        {/* Minimal visual */}
        <div className="relative mx-auto mb-12 flex h-64 w-64 items-center justify-center">

            {/* Outer rings */}
            <div className="absolute inset-0 rounded-full border border-white/[0.07]" />
            <div className="absolute inset-7 rounded-full border border-white/[0.08]" />
            <div className="absolute inset-14 rounded-full border border-white/[0.08]" />

            {/* Glow */}
            <div className="absolute h-40 w-40 rounded-full bg-orange-500/20 blur-[70px]" />

            {/* Center logo */}
            <div className="relative flex h-28 w-28 items-center justify-center rounded-[30px] border border-white/15 bg-gradient-to-br from-white/10 to-white/[0.02] shadow-2xl shadow-orange-500/10 backdrop-blur-xl">
                <span className="text-5xl font-black tracking-tighter text-white">
                    <span className="text-orange-500">D</span>S
                </span>
            </div>

            {/* Small decorative dots */}
            <div className="absolute right-7 top-10 h-3 w-3 rounded-full bg-orange-400 shadow-[0_0_20px_rgba(251,146,60,0.8)]" />
            <div className="absolute bottom-10 left-8 h-2.5 w-2.5 rounded-full bg-indigo-400 shadow-[0_0_20px_rgba(129,140,248,0.8)]" />
        </div>

        {/* Heading */}
        <h2 className="text-4xl font-bold leading-tight tracking-tight text-white xl:text-5xl">
            Code. Create.
            <br />
            <span className="bg-gradient-to-r from-orange-400 to-amber-200 bg-clip-text text-transparent">
                Collaborate.
            </span>
        </h2>

        <p className="mx-auto mt-5 max-w-md text-base leading-7 text-slate-400">
            A workspace designed to bring your ideas to life.
            Build, experiment and create without limits.
        </p>

        {/* Minimal bottom indicators */}
        <div className="mt-10 flex items-center justify-center gap-6">
            <div className="flex items-center gap-2 text-xs text-slate-400">
                <FiCode className="text-orange-400" />
                Code
            </div>

            <div className="h-1 w-1 rounded-full bg-slate-600" />

            <div className="flex items-center gap-2 text-xs text-slate-400">
                <FiCloud className="text-indigo-400" />
                Cloud
            </div>

            <div className="h-1 w-1 rounded-full bg-slate-600" />

            <div className="flex items-center gap-2 text-xs text-slate-400">
                <FiZap className="text-amber-400" />
                Create
            </div>
        </div>

    </div>

    {/* Bottom branding */}
    <div className="absolute bottom-7 left-0 right-0 text-center">
        <p className="text-[11px] tracking-widest text-slate-600">
            MADE FOR DEVELOPERS · BUILT FOR IDEAS
        </p>
    </div>
</div>


    </div>


        </>
    )
}

export default Login