import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import BACKEND_URL from "../../backendURL";
import { HiUserGroup, HiBookOpen, HiDocumentText, HiMail } from "react-icons/hi";

export default function AdminDashboard() {
  const [stats, setStats] = useState({ users: 0, courses: 0, notes: 0 });
  const [loading, setLoading] = useState(true);
  const [recentActivity, setRecentActivity] = useState([]);
  const location = useLocation();
  const base_url=BACKEND_URL
  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const [u, c, n] = await Promise.all([
        axios.get(`${base_url}/api/admin/users`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
        axios.get(`${base_url}/api/courses`),
        axios.get(`${base_url}/api/notes`),
      ]);
      setStats({ 
        users: u.data.length, 
        courses: c.data.length, 
        notes: n.data.length 
      });

    
    } catch (error) {
      console.error("Error fetching stats:", error);
    } finally {
      setLoading(false);
    }
  };

 const navLinks = [
  {
    path: "/admin/users",
    label: "Manage Users",
    icon: <HiUserGroup className="w-5 h-5" />,
  },
  {
    path: "/admin/courses",
    label: "Manage Courses",
    icon: <HiBookOpen className="w-5 h-5" />,
  },
  {
    path: "/admin/notes",
    label: "Manage Notes",
    icon: <HiDocumentText className="w-5 h-5" />,
  },
  {
    path: "/admin/contact",
    label: "Manage Contact",
    icon: <HiMail className="w-5 h-5" />,
  },
];
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mb-4"></div>
          <p className="text-gray-600 font-medium text-lg">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Top Navigation */}
      <nav className="bg-white shadow-lg border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                Admin Panel
              </h1>
            </div>
            <Link
            
              to="/"
              className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              <span className="font-medium">Back to Home</span>
            </Link>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Quick Navigation Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`group relative overflow-hidden rounded-2xl transition-all duration-300 ${
                location.pathname === link.path
                  ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-xl scale-105"
                  : "bg-white text-gray-700 hover:shadow-lg hover:scale-105"
              }`}
            >
              <div className="p-6">
                <div className={`mb-3 ${location.pathname === link.path ? "text-white" : "text-blue-600"}`}>
                  {link.icon}
                </div>
                <h3 className="font-semibold text-sm">{link.label}</h3>
              </div>
              {location.pathname !== link.path && (
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-10 transition-opacity"></div>
              )}
            </Link>
          ))}
        </div>

        {/* Stats Cards */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center">
            <svg className="w-8 h-8 mr-3 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            Overview Statistics
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Users Card */}
            <div className="group relative overflow-hidden bg-gradient-to-br from-blue-500 to-purple-600 p-8 rounded-2xl text-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full -mr-16 -mt-16"></div>
              <div className="relative">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-14 h-14 bg-body bg-opacity-20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                    <HiUserGroup/>
                  </div>
                  <span className="text-sm text-black font-semibold bg-white bg-opacity-20 px-3 py-1 rounded-full">Live</span>
                </div>
                <h3 className="text-lg font-medium mb-2 opacity-90">Total Users</h3>
                <p className="text-5xl font-bold mb-2">{stats.users}</p>
                <p className="text-sm opacity-75">Registered accounts</p>
              </div>
            </div>

            {/* Courses Card */}
            <div className="group relative overflow-hidden bg-gradient-to-br from-green-500 to-emerald-600 p-8 rounded-2xl text-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full -mr-16 -mt-16"></div>
              <div className="relative">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-14 h-14 bg-body bg-opacity-20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                    <HiBookOpen/>
                  </div>
                  <span className="text-sm text-black font-semibold bg-white bg-opacity-20 px-3 py-1 rounded-full">Active</span>
                </div>
                <h3 className="text-lg font-medium mb-2 opacity-90">Total Courses</h3>
                <p className="text-5xl font-bold mb-2">{stats.courses}</p>
                <p className="text-sm opacity-75">Available courses</p>
              </div>
            </div>

            {/* Notes Card */}
            <div className="group relative overflow-hidden bg-gradient-to-br from-pink-500 to-rose-600 p-8 rounded-2xl text-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full -mr-16 -mt-16"></div>
              <div className="relative">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-14 h-14 bg-body bg-opacity-20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                    <HiDocumentText/>
                  </div>
                  <span className="text-sm font-semibold bg-white bg-opacity-20 px-3 py-1 rounded-full text-black">Files</span>
                </div>
                <h3 className="text-lg font-medium mb-2 opacity-90">Total Notes</h3>
                <p className="text-5xl font-bold mb-2">{stats.notes}</p>
                <p className="text-sm opacity-75">Study materials</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}