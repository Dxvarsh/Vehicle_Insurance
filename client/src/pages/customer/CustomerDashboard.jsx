import React from 'react';
import { useAuth } from '../../context/AuthContext';
import Button from '../../components/common/Button';
import { SkeletonStats } from '../../components/common/Loader';
import { Car, FileText, AlertCircle, TrendingUp } from 'lucide-react';

const CustomerDashboard = () => {
    const { user, logout } = useAuth();
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        // Simulate data loading
        setTimeout(() => setLoading(false), 1000);
    }, []);

    const stats = [
        { title: 'My Policies', value: '0', icon: FileText, color: 'bg-blue-500', bgLight: 'bg-blue-50' },
        { title: 'My Vehicles', value: '0', icon: Car, color: 'bg-green-500', bgLight: 'bg-green-50' },
        { title: 'Active Claims', value: '0', icon: AlertCircle, color: 'bg-orange-500', bgLight: 'bg-orange-50' },
        { title: 'Total Premiums', value: '₹0', icon: TrendingUp, color: 'bg-purple-500', bgLight: 'bg-purple-50' },
    ];

    return (
        <div className="p-6 md:p-8">
            {/* Welcome Header with Glass Effect */}
            <div className="mb-8 backdrop-blur-lg bg-gradient-to-r from-primary/10 to-primary-100/20 rounded-2xl p-6 border border-white/20 shadow-lg">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div>
                        <h1 className="text-3xl font-bold font-heading text-slate-800 mb-2">
                            Welcome back, {user?.username}! 👋
                        </h1>
                        <p className="text-slate-600">
                            Here's an overview of your insurance portfolio
                        </p>
                    </div>
                    <Button variant="danger" onClick={logout} className="mt-4 md:mt-0">
                        Logout
                    </Button>
                </div>
            </div>

            {/* Stats Grid */}
            {loading ? (
                <SkeletonStats count={4} />
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {stats.map((stat, index) => (
                        <div
                            key={index}
                            className="backdrop-blur-sm bg-white/80 rounded-xl shadow-md border border-white/20 p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                        >
                            <div className="flex items-center justify-between mb-4">
                                <div className={`${stat.bgLight} p-3 rounded-lg`}>
                                    <stat.icon className={`h-6 w-6 text-${stat.color.replace('bg-', '')}`} />
                                </div>
                            </div>
                            <h3 className="text-slate-500 text-sm font-medium uppercase tracking-wider mb-2">
                                {stat.title}
                            </h3>
                            <p className="text-3xl font-bold text-slate-800">{stat.value}</p>
                        </div>
                    ))}
                </div>
            )}

            {/* Quick Actions */}
            <div className="backdrop-blur-sm bg-white/80 rounded-xl shadow-md border border-white/20 p-6">
                <h2 className="text-xl font-bold text-slate-800 mb-4">Quick Actions</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <button className="flex items-center justify-center gap-3 p-4 border-2 border-primary text-primary rounded-lg hover:bg-primary hover:text-white transition-all duration-200 font-medium">
                        <Car className="h-5 w-5" />
                        Add Vehicle
                    </button>
                    <button className="flex items-center justify-center gap-3 p-4 border-2 border-primary text-primary rounded-lg hover:bg-primary hover:text-white transition-all duration-200 font-medium">
                        <FileText className="h-5 w-5" />
                        Browse Policies
                    </button>
                    <button className="flex items-center justify-center gap-3 p-4 border-2 border-primary text-primary rounded-lg hover:bg-primary hover:text-white transition-all duration-200 font-medium">
                        <AlertCircle className="h-5 w-5" />
                        Submit Claim
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CustomerDashboard;
