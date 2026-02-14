import React from 'react';
import { NavLink } from 'react-router-dom';
import {
    LayoutDashboard,
    Car,
    FileText,
    CreditCard,
    RefreshCw,
    AlertCircle,
    Bell,
    LogOut
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const Sidebar = () => {
    const { logout } = useAuth();

    const menuItems = [
        { name: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
        { name: 'Vehicles', icon: Car, path: '/vehicles' },
        { name: 'Policies', icon: FileText, path: '/policies' },
        { name: 'Premiums', icon: CreditCard, path: '/premiums' },
        { name: 'Renewals', icon: RefreshCw, path: '/renewals' },
        { name: 'Claims', icon: AlertCircle, path: '/claims' },
        { name: 'Notifications', icon: Bell, path: '/notifications' },
    ];

    return (
        <aside className="hidden lg:flex flex-col w-64 bg-white border-r border-slate-200 h-screen transition-all duration-300">
            <div className="flex items-center justify-center h-20 border-b border-slate-200">
                <span className="text-2xl font-bold font-poppins text-primary">VIMS</span>
            </div>

            <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
                {menuItems.map((item) => (
                    <NavLink
                        key={item.name}
                        to={item.path}
                        className={({ isActive }) =>
                            `flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors duration-200 ${isActive
                                ? 'bg-primary text-white shadow-md'
                                : 'text-slate-600 hover:bg-slate-50 hover:text-primary'
                            }`
                        }
                    >
                        <item.icon className="w-5 h-5 mr-3" />
                        {item.name}
                    </NavLink>
                ))}
            </nav>

            <div className="p-4 border-t border-slate-200">
                <button
                    onClick={logout}
                    className="flex items-center w-full px-4 py-3 text-sm font-medium text-red-600 rounded-lg hover:bg-red-50 transition-colors duration-200"
                >
                    <LogOut className="w-5 h-5 mr-3" />
                    Logout
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;
