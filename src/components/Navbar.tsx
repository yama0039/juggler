
import { Link, useLocation } from 'react-router-dom';
import { Home, Calculator, PenTool, History, LogIn, LogOut, Target } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import clsx from 'clsx';

const Navbar = () => {
    const location = useLocation();
    const { user, signOut } = useAuth();

    const navItems = [
        { path: '/', label: 'Home', icon: Home },
        { path: '/counter', label: 'カウンター', icon: Target },
        { path: '/analyzer', label: '判別', icon: Calculator },
        { path: '/record', label: '入力', icon: PenTool },
        { path: '/history', label: '履歴', icon: History },
    ];

    return (
        <nav className="bg-gray-900 border-b border-gray-800 sticky top-0 z-50">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center h-16">
                    <Link to="/" className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-juggler-neonPink to-juggler-neonYellow">
                        GOGO! Analyzer
                    </Link>
                    <div className="flex space-x-1">
                        {navItems.map((item) => {
                            const Icon = item.icon;
                            const isActive = location.pathname === item.path;
                            return (
                                <Link
                                    key={item.path}
                                    to={item.path}
                                    className={clsx(
                                        "flex flex-col items-center justify-center p-2 rounded-md transition-colors duration-200 text-xs sm:text-sm sm:flex-row sm:space-x-2",
                                        isActive
                                            ? "text-juggler-neonYellow bg-gray-800"
                                            : "text-gray-400 hover:text-white hover:bg-gray-800"
                                    )}
                                >
                                    <Icon size={20} />
                                    <span className="hidden sm:inline">{item.label}</span>
                                </Link>
                            );
                        })}
                        {user ? (
                            <button
                                onClick={() => signOut()}
                                className="flex flex-col items-center justify-center p-2 rounded-md transition-colors duration-200 text-xs sm:text-sm sm:flex-row sm:space-x-2 text-gray-400 hover:text-red-400 hover:bg-gray-800"
                            >
                                <LogOut size={20} />
                                <span className="hidden sm:inline">Logout</span>
                            </button>
                        ) : (
                            <Link
                                to="/login"
                                className={clsx(
                                    "flex flex-col items-center justify-center p-2 rounded-md transition-colors duration-200 text-xs sm:text-sm sm:flex-row sm:space-x-2",
                                    location.pathname === '/login'
                                        ? "text-juggler-neonYellow bg-gray-800"
                                        : "text-gray-400 hover:text-white hover:bg-gray-800"
                                )}
                            >
                                <LogIn size={20} />
                                <span className="hidden sm:inline">Login</span>
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
