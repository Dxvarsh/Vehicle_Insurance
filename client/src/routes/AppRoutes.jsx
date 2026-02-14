import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from '../pages/auth/LoginPage';
import RegisterPage from '../pages/auth/RegisterPage';
import CustomerDashboard from '../pages/customer/CustomerDashboard';
import { ProtectedRoute } from '../components/ProtectedRoute';
import DashboardLayout from '../components/layout/DashboardLayout';

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />

            <Route
                path="/dashboard"
                element={
                    <ProtectedRoute>
                        <DashboardLayout>
                            <CustomerDashboard />
                        </DashboardLayout>
                    </ProtectedRoute>
                }
            />

            {/* Placeholder routes for navigation */}
            <Route path="/vehicles" element={<ProtectedRoute><DashboardLayout><div>Vehicles Page</div></DashboardLayout></ProtectedRoute>} />
            <Route path="/policies" element={<ProtectedRoute><DashboardLayout><div>Policies Page</div></DashboardLayout></ProtectedRoute>} />
            <Route path="/premiums" element={<ProtectedRoute><DashboardLayout><div>Premiums Page</div></DashboardLayout></ProtectedRoute>} />
            <Route path="/renewals" element={<ProtectedRoute><DashboardLayout><div>Renewals Page</div></DashboardLayout></ProtectedRoute>} />
            <Route path="/claims" element={<ProtectedRoute><DashboardLayout><div>Claims Page</div></DashboardLayout></ProtectedRoute>} />
            <Route path="/notifications" element={<ProtectedRoute><DashboardLayout><div>Notifications Page</div></DashboardLayout></ProtectedRoute>} />

            <Route path="/" element={<Navigate to="/dashboard" />} />
        </Routes>
    );
};

export default AppRoutes;
