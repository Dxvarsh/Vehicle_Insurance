import React from 'react';
import { useAuth } from '../../context/AuthContext';

const Navbar = () => {
    const { user, logout } = useAuth();

    return (
        <header className="bg-white shadow-sm border-b border-slate-200">
            <div className="flex items-center justify-between px-6 py-4">
                <div className="flex items-center">
                    <button className="text-slate-500 lg:hidden">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>
                    <div className="relative mx-4 lg:mx-0">
                        <span className="text-xl font-bold font-poppins text-primary">InsurancePortal</span>
                    </div>
                </div>

                <div className="flex items-center">
                    <div className="flex items-center space-x-4">
                        <span className="text-slate-700 text-sm font-medium">{user?.username}</span>
                        <div className="h-8 w-8 rounded-full bg-primary text-white flex items-center justify-center font-bold">
                            {user?.username?.charAt(0).toUpperCase()}
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Navbar;
