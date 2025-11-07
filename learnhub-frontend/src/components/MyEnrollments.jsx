// src/pages/MyEnrollments.jsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import BACKEND_URL from "../backendURL";

export default function MyEnrollments() {
  const { token } = useAuth();
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const base_url=BACKEND_URL;

  useEffect(() => {
    fetchEnrollments();
  }, []);

  const fetchEnrollments = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${base_url}/api/enrollments/my-enrollments`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch enrollments");
      }

      const data = await response.json();
      setEnrollments(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mb-4"></div>
          <p className="text-gray-600 font-medium text-lg">Loading your enrollments...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-4">
            My Enrolled Courses 🎓
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Continue your learning journey with your enrolled courses
          </p>
        </div>

        {/* Stats */}
        {enrollments.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-2xl shadow-lg p-6 text-center transform hover:scale-105 transition-transform">
              <div className="text-4xl mb-2">📚</div>
              <div className="text-3xl font-bold text-blue-600 mb-1">{enrollments.length}</div>
              <div className="text-gray-600 font-medium">Total Enrolled</div>
            </div>
            <div className="bg-white rounded-2xl shadow-lg p-6 text-center transform hover:scale-105 transition-transform">
              <div className="text-4xl mb-2">🎁</div>
              <div className="text-3xl font-bold text-green-600 mb-1">
                {enrollments.filter((e) => e.amount === 0).length}
              </div>
              <div className="text-gray-600 font-medium">Free Courses</div>
            </div>
            <div className="bg-white rounded-2xl shadow-lg p-6 text-center transform hover:scale-105 transition-transform">
              <div className="text-4xl mb-2">💎</div>
              <div className="text-3xl font-bold text-purple-600 mb-1">
                {enrollments.filter((e) => e.amount > 0).length}
              </div>
              <div className="text-gray-600 font-medium">Premium Courses</div>
            </div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
            <div className="text-6xl mb-4">⚠️</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Error Loading Enrollments</h3>
            <p className="text-gray-600 mb-4">{error}</p>
            <button
              onClick={fetchEnrollments}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Enrollments Grid */}
        {!error && enrollments.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {enrollments.map((enrollment) => (
              <div
                key={enrollment._id}
                className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden"
              >
                <div className="relative h-48 bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
                  <img
                    src={enrollment.course.image}
                    alt={enrollment.course.title}
                    className="w-24 h-24 object-contain"
                  />
                  <div className="absolute top-3 right-3 flex flex-col gap-2">
                    {enrollment.amount === 0 ? (
                      <span className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                        Free
                      </span>
                    ) : (
                      <span className="bg-purple-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                        ₹{enrollment.amount}
                      </span>
                    )}
                    <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                      Enrolled
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="font-bold text-xl mb-2 text-gray-800 line-clamp-2 group-hover:text-blue-600 transition">
                    {enrollment.course.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                    {enrollment.course.description}
                  </p>

                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <span className="flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                      </svg>
                      {enrollment.course.duration || "Self-paced"}
                    </span>
                    <span className="flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
                      </svg>
                      {enrollment.course.level}
                    </span>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-3 mb-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Enrolled on</span>
                      <span className="font-semibold text-gray-800">
                        {new Date(enrollment.enrolledAt).toLocaleDateString('en-IN')}
                      </span>
                    </div>
                  </div>

                  <Link
                    to={`/courses/${enrollment.course._id}`}
                    className="block w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white text-center py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all shadow-md hover:shadow-lg"
                  >
                    Continue Learning
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : !error && (
          <div className="bg-white rounded-2xl shadow-lg p-16 text-center">
            <div className="text-6xl mb-6">📚</div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">No Enrollments Yet</h3>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              You haven't enrolled in any courses yet. Start learning by browsing our course catalog!
            </p>
            <Link
              to="/courses"
              className="inline-flex items-center bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-full font-semibold hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              Browse Courses
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}