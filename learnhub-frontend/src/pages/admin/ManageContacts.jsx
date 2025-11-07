import { useEffect, useState } from "react";
import axios from "axios";
import BACKEND_URL from "../../backendUrl";
import AdminNavbar from "./adminnavbarcomp/AdminNavbar";

export default function ManageContacts() {
  const base_url = BACKEND_URL;
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchContacts = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`${base_url}/api/contact/admin/contacts`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setContacts(res.data);
    } catch (error) {
      console.error("Error fetching contacts:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id, currentStatus) => {
    try {
      const token = localStorage.getItem("token");
      const newStatus = currentStatus === "resolved" ? "pending" : "resolved";
      await axios.patch(
        `${base_url}/api/contact/admin/contacts/${id}/status`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setContacts((prev) =>
        prev.map((c) =>
          c._id === id ? { ...c, status: newStatus } : c
        )
      );
    } catch (error) {
      console.error("Error updating contact status:", error);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-gray-600 font-medium text-lg">Loading contacts...</div>
      </div>
    );
  }

  return (
    
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-8">
      <AdminNavbar/>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">📩 Manage Contacts</h1>

      {contacts.length === 0 ? (
        <div className="bg-white p-10 rounded-xl shadow text-center text-gray-600">
          No messages yet.
        </div>
      ) : (
        <div className="overflow-x-auto bg-white rounded-2xl shadow-lg">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
              <tr>
                <th className="p-4 text-left">Name</th>
                <th className="p-4 text-left">Email</th>
                <th className="p-4 text-left">Subject</th>
                <th className="p-4 text-left">Message</th>
                <th className="p-4 text-left">Status</th>
                <th className="p-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {contacts.map((contact) => (
                <tr key={contact._id} className="hover:bg-gray-50 transition">
                  <td className="p-4 font-semibold">{contact.name}</td>
                  <td className="p-4 text-gray-600">{contact.email}</td>
                  <td className="p-4 text-gray-700">{contact.subject}</td>
                  <td className="p-4 text-gray-600 line-clamp-2">{contact.message}</td>
                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        contact.status === "resolved"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {contact.status}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <button
                      onClick={() => handleStatusChange(contact._id, contact.status)}
                      className={`px-4 py-2 rounded-lg font-semibold transition ${
                        contact.status === "resolved"
                          ? "bg-yellow-100 text-yellow-700 hover:bg-yellow-200"
                          : "bg-green-100 text-green-700 hover:bg-green-200"
                      }`}
                    >
                      {contact.status === "resolved" ? "Mark Pending" : "Mark Resolved"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
