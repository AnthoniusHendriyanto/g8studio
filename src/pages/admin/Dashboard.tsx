import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { LogOut, LayoutDashboard, Handshake, FolderOpen, Image, Link2 } from "lucide-react";
import { Link, Outlet, useLocation } from "react-router-dom";

export default function Dashboard() {
    const { signOut, user } = useAuth();
    const location = useLocation();

    const isActive = (path: string) => location.pathname === path;

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            {/* Top Navigation */}
            <nav className="bg-white border-b px-6 py-4 flex items-center justify-between sticky top-0 z-50">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center text-white font-bold">G8</div>
                    <span className="text-xl font-bold hidden sm:inline-block">Admin</span>
                </div>
                <div className="flex items-center gap-4">
                    <span className="text-sm text-gray-600 hidden sm:inline-block">{user?.email}</span>
                    <Button variant="outline" size="sm" onClick={() => signOut()}>
                        <LogOut className="w-4 h-4 mr-2" />
                        Sign Out
                    </Button>
                </div>
            </nav>

            <div className="flex flex-1 container mx-auto p-4 md:p-8 gap-8 max-w-7xl">
                {/* Sidebar */}
                <aside className="w-64 hidden md:block shrink-0">
                    <div className="bg-white rounded-lg shadow-sm border p-4 space-y-2 sticky top-24">
                        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 px-2">Menu</h3>

                        <Link to="/admin">
                            <Button variant={isActive('/admin') ? "secondary" : "ghost"} className="w-full justify-start">
                                <LayoutDashboard className="w-4 h-4 mr-2" />
                                Dashboard
                            </Button>
                        </Link>

                        <Link to="/admin/partners">
                            <Button variant={isActive('/admin/partners') ? "secondary" : "ghost"} className="w-full justify-start">
                                <Handshake className="w-4 h-4 mr-2" />
                                Partners
                            </Button>
                        </Link>

                        <Link to="/admin/portfolio">
                            <Button variant={isActive('/admin/portfolio') ? "secondary" : "ghost"} className="w-full justify-start">
                                <FolderOpen className="w-4 h-4 mr-2" />
                                Portfolio
                            </Button>
                        </Link>

                        <Link to="/admin/hero">
                            <Button variant={isActive('/admin/hero') ? "secondary" : "ghost"} className="w-full justify-start">
                                <Image className="w-4 h-4 mr-2" />
                                Hero Slider
                            </Button>
                        </Link>

                        <Link to="/admin/links">
                            <Button variant={isActive('/admin/links') ? "secondary" : "ghost"} className="w-full justify-start">
                                <Link2 className="w-4 h-4 mr-2" />
                                Quick Links
                            </Button>
                        </Link>
                    </div>
                </aside>

                {/* Main Content Area */}
                <main className="flex-1">
                    <div className="bg-white rounded-lg shadow-sm border p-6 min-h-[500px]">
                        <Outlet />
                        {/* If we are exactly at /admin, show welcome message */}
                        {location.pathname === '/admin' && (
                            <div className="text-center py-20">
                                <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome Back!</h2>
                                <p className="text-gray-500 max-w-md mx-auto mb-8">
                                    Use the sidebar to manage your website content.
                                    Currently, you can manage your **Partners**.
                                </p>
                                <Link to="/admin/partners">
                                    <Button>Manage Partners</Button>
                                </Link>
                            </div>
                        )}
                    </div>
                </main>
            </div>
        </div>
    );
}
