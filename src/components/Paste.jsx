import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  handleDelete,
  handleSelectPaste,
  handleDeleteSelected,
  filterAndSortPastes,
} from "../utils/pasteUtils";

// Search icon as an SVG component
const SearchIcon = () => (
  <svg
    className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
    />
  </svg>
);

const Paste = () => {
  const pastes = useSelector((state) => state.paste.pastes);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPastes, setSelectedPastes] = useState([]);
  const dispatch = useDispatch();

  const filteredPastes = filterAndSortPastes(pastes, searchTerm);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 content-wrapper">
        <div className="flex justify-between items-center mb-6">
          <div className="flex-1 relative">
            <input
              className="w-full p-3 pl-11 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all
              dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
              type="search"
              placeholder="Search your notes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <SearchIcon />
          </div>
          {selectedPastes.length > 0 && (
            <button
              onClick={() =>
                handleDeleteSelected(
                  selectedPastes,
                  dispatch,
                  setSelectedPastes
                )
              }
              className="ml-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
            >
              <span>Delete Selected ({selectedPastes.length})</span>
            </button>
          )}
        </div>

        <div className="grid gap-6">
          {filteredPastes.length > 0 ? (
            filteredPastes.map((paste) => (
              <div
                key={paste?._id}
                className={`bg-white dark:bg-gray-700 rounded-lg shadow-lg p-6 hover:shadow-xl transition-all ${
                  selectedPastes.includes(paste._id)
                    ? "ring-2 ring-blue-500"
                    : ""
                }`}
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={selectedPastes.includes(paste._id)}
                      onChange={() =>
                        handleSelectPaste(
                          paste._id,
                          selectedPastes,
                          setSelectedPastes
                        )
                      }
                      className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                    />
                    <h3 className="text-xl font-bold text-gray-800 dark:text-white">
                      {paste.title}
                    </h3>
                  </div>
                  <div className="flex gap-2">
                    <Link
                      to={`/?pasteId=${paste?._id}`}
                      className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                    >
                      Edit
                    </Link>
                    <Link
                      to={`/pastes/${paste?._id}`}
                      className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
                    >
                      View
                    </Link>
                    <button
                      onClick={() => handleDelete(paste?._id, dispatch)}
                      className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </div>

                <div className="bg-gray-50 dark:bg-gray-600 rounded p-3 mb-4">
                  <p className="text-gray-700 dark:text-gray-200 line-clamp-3">
                    {paste.content}
                  </p>
                </div>

                <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400">
                  <div>
                    Created: {new Date(paste.createdAt).toLocaleString()}
                  </div>
                  <div>
                    Updated: {new Date(paste.updatedAt).toLocaleString()}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-10 text-gray-500 dark:text-gray-400">
              No pastes found. Create your first paste!
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Paste;
