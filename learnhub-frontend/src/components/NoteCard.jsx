import { FileDown } from "lucide-react"; 

export default function NoteCard({ note }) {
  return (
    <div className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

      <div className="relative p-6 flex flex-col h-full">
        <div className="relative mb-4 mx-auto">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-500 rounded-2xl blur-xl opacity-20 group-hover:opacity-40 transition-opacity duration-300"></div>
          <div className="relative bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-4 group-hover:scale-105 transition-transform duration-300">
            <FileDown className="w-12 h-12 text-blue-600 group-hover:text-purple-600 transition-colors" />
          </div>
        </div>

        <div className="flex-1 flex flex-col text-center">
          <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 transition-all duration-300">
            {note.title}
          </h3>

          <p className="text-gray-600 text-sm mb-4 line-clamp-2 flex-1">
            {note.description}
          </p>

          <div className="mb-4">
            <span className="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-semibold bg-gradient-to-r from-blue-100 to-purple-100 text-purple-700 border border-purple-200">
              📘 {note.course}
            </span>
          </div>

          <a
            href={note.fileUrl}
            download
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-6 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-md hover:shadow-xl"
          >
            <FileDown className="w-4 h-4 mr-2" />
            Download Note
          </a>
        </div>
      </div>
    </div>
  );
}
