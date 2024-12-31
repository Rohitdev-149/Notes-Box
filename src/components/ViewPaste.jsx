import React from "react";
import { useParams, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-hot-toast";

function ViewPaste() {
  // Get pasteId from URL parameters
  const { pasteId } = useParams();

  // Get paste from Redux store
  const paste = useSelector((state) =>
    state.paste.pastes.find((p) => p._id === pasteId)
  );

  // Handle copy to clipboard
  const handleCopy = () => {
    navigator.clipboard.writeText(paste?.content);
    toast.success("Copied to clipboard!");
  };

  // Handle download
  const handleDownload = () => {
    const element = document.createElement("a");
    const file = new Blob([paste?.content], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = `${paste?.title || "paste"}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    toast.success("Download started!");
  };

  if (!paste) {
    return (
      <div className="text-center mt-10">
        <h2 className="text-2xl font-bold text-red-500">Paste not found!</h2>
        <Link
          to="/"
          className="text-blue-500 hover:underline mt-4 inline-block"
        >
          Go Back Home
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 content-wrapper">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
            {paste.title}
          </h1>
          <div className="flex gap-2">
            <button
              onClick={handleCopy}
              className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
            >
              Copy
            </button>
            <button
              onClick={handleDownload}
              className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600"
            >
              Download
            </button>
            <Link
              to={`/?pasteId=${paste._id}`}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Edit
            </Link>
          </div>
        </div>

        <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 min-h-[200px] mb-4">
          {Array.isArray(paste.content) ? (
            paste.content.map((content, index) => (
              <div key={index} className="mb-4">
                <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                  Section #{index + 1}
                </div>
                <pre className="whitespace-pre-wrap text-gray-800 dark:text-gray-200">
                  {content}
                </pre>
              </div>
            ))
          ) : (
            <pre className="whitespace-pre-wrap text-gray-800 dark:text-gray-200">
              {paste.content}
            </pre>
          )}
        </div>

        <div className="text-sm text-gray-600 dark:text-gray-400">
          <p>Created: {new Date(paste.createdAt).toLocaleString()}</p>
          <p>Last Updated: {new Date(paste.updatedAt).toLocaleString()}</p>
        </div>

        <div className="mt-6">
          <Link
            to="/"
            className="text-blue-500 hover:text-blue-600 dark:hover:text-blue-400"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ViewPaste;
