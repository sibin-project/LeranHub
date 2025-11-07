import { useState, useEffect } from "react";
import axios from "axios";
import NoteCard from "../components/NoteCard";
import BACKEND_URL from "../backendURL";

export default function Notes() {
  const [notes, setNotes] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const base_url = BACKEND_URL;
  //  Fetch notes from backend
  useEffect(() => {
    const fetchNotes = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${base_url}/api/notes`);
        setNotes(res.data);
      } catch (err) {
        console.error("Error fetching notes:", err);
        setError("Failed to load notes. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, []);

  //  Unique course list for filter
  const courses = ["All", ...new Set(notes.map((n) => n.course))];

  // Filter notes
  const filteredNotes =
    selectedCourse === "All"
      ? notes
      : notes.filter((n) => n.course === selectedCourse);

  return (
    <section className="max-w-6xl mx-auto px-6 py-16">
      <h2 className="text-3xl md:text-4xl font-bold text-center text-accent mb-8">
        Course Notes
      </h2>

      {/* Error */}
      {error && <p className="text-red-500 text-center mb-6">{error}</p>}

      {/* Loading */}
      {loading ? (
        <p className="text-gray-400 text-center">Loading notes...</p>
      ) : (
        <>
          {/* Filter Dropdown */}
          <div className="flex justify-center mb-10">
            <select
              className="bg-white text-black px-4 py-2  shadow  focus:outline-none"
              value={selectedCourse}
              onChange={(e) => setSelectedCourse(e.target.value)}
            >
              {courses.map((c, i) => (
                <option key={i} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          {/* Notes Grid */}
          {filteredNotes.length === 0 ? (
            <p className="text-gray-400 text-center">No notes found for this course.</p>
          ) : (
            <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {filteredNotes.map((note) => (
                <NoteCard key={note._id} note={note} />
              ))}
            </div>
          )}
        </>
      )}
    </section>
  );
}
