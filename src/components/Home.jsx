import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateToPastes, addToPastes } from "../redux/pasteSlice";
import { toast } from "react-hot-toast";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

function Home() {
  const [title, setTitle] = useState("");
  const [contents, setContents] = useState([{ id: Date.now(), value: "" }]);
  const [searchParams, setSearchParams] = useSearchParams();
  const pasteId = searchParams.get("pasteId");
  const dispatch = useDispatch();
  const allPaste = useSelector((state) => state.paste);
  const [tags, setTags] = useState([]);

  useEffect(() => {
    if (pasteId && allPaste?.pastes) {
      const paste = allPaste.pastes.find((p) => p._id === pasteId);
      if (paste) {
        setTitle(paste.title);
        // If paste.content is an array, use it directly, otherwise create a single content
        setContents(
          Array.isArray(paste.content)
            ? paste.content.map((c) => ({
                id: Date.now() + Math.random(),
                value: c,
              }))
            : [{ id: Date.now(), value: paste.content }]
        );
        setTags(paste.tags || []);
      } else {
        resetForm();
      }
    }
  }, [pasteId, allPaste]);

  const resetForm = () => {
    setTitle("");
    setContents([{ id: Date.now(), value: "" }]);
    setTags([]);
    setSearchParams({});
  };

  const addNewContent = () => {
    setContents([...contents, { id: Date.now(), value: "" }]);
  };

  const removeContent = (id) => {
    if (contents.length > 1) {
      setContents(contents.filter((c) => c.id !== id));
    } else {
      toast.error("Cannot remove the last content section");
    }
  };

  const updateContent = (id, newValue) => {
    setContents(
      contents.map((c) => (c.id === id ? { ...c, value: newValue } : c))
    );
  };

  function createPaste() {
    if (!title.trim()) {
      toast.error("Please enter a title");
      return;
    }
    if (contents.some((c) => !c.value.trim())) {
      toast.error("Please fill all content sections");
      return;
    }

    const paste = {
      title: title.trim(),
      content: contents.map((c) => c.value.trim()),
      tags: tags,
      _id: pasteId || Math.random().toString(36).substring(2, 15),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    if (pasteId) {
      dispatch(updateToPastes(paste));
    } else {
      dispatch(addToPastes(paste));
    }

    toast.success("Notes saved successfully!");
    resetForm();
  }

  // Rich text editor modules configuration
  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "code-block"],
      ["clean"],
    ],
  };

  // Add word and character count calculation for all sections
  const getWordCount = () => {
    return contents.reduce((total, content) => {
      return total + content.value.trim().split(/\s+/).filter(Boolean).length;
    }, 0);
  };

  const getCharCount = () => {
    return contents.reduce((total, content) => {
      return total + content.value.length;
    }, 0);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 content-wrapper">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-4">
            <input
              className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all 
              dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              type="text"
              placeholder="Enter title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <button
              onClick={addNewContent}
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
            >
              Add Section
            </button>
            <button
              onClick={createPaste}
              disabled={!title.trim() || contents.some((c) => !c.value.trim())}
              className={`px-6 py-3 rounded-lg font-medium transition-all ${
                !title.trim() || contents.some((c) => !c.value.trim())
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-blue-500 to-purple-500 hover:opacity-90"
              } text-white`}
            >
              {pasteId ? "Update" : "Create"}
            </button>
          </div>

          {contents.map((content, index) => (
            <div key={content.id} className="relative">
              <div className="absolute -left-10 top-2 text-gray-500 dark:text-gray-400">
                #{index + 1}
              </div>
              <div className="flex gap-2">
                <ReactQuill
                  theme="snow"
                  value={content.value}
                  onChange={(value) => updateContent(content.id, value)}
                  modules={modules}
                  className="flex-1 h-[20vh] mb-12 dark:text-white quill-dark"
                  placeholder={`Enter content for section ${index + 1}...`}
                />
                {contents.length > 1 && (
                  <button
                    onClick={() => removeContent(content.id)}
                    className="self-start mt-2 p-2 text-red-500 hover:text-red-600"
                  >
                    ×
                  </button>
                )}
              </div>
            </div>
          ))}

          <div className="text-sm text-gray-500 dark:text-gray-400 mt-2 flex justify-between">
            <span>Total Words: {getWordCount()}</span>
            <span>Total Characters: {getCharCount()}</span>
          </div>
          <div className="flex gap-2 mb-4">
            <input
              type="text"
              placeholder="Add tags (comma separated)"
              className="flex-1 p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              onKeyDown={(e) => {
                if (e.key === "," || e.key === "Enter") {
                  e.preventDefault();
                  const newTag = e.target.value.trim();
                  if (newTag && !tags.includes(newTag)) {
                    setTags([...tags, newTag]);
                    e.target.value = "";
                  }
                }
              }}
            />
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 px-2 py-1 rounded"
                >
                  {tag}
                  <button
                    onClick={() => setTags(tags.filter((t) => t !== tag))}
                    className="ml-2"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
