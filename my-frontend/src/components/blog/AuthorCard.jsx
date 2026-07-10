import React from "react";

export default function AuthorCard({ authorName }) {
  // Simple representation of author info
  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm flex flex-col items-center text-center">
      <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-teal-500 to-emerald-500 flex items-center justify-center text-white text-3xl font-bold font-poppins shadow-inner mb-4">
        {authorName ? authorName.charAt(0) : "H"}
      </div>
      <h3 className="text-lg font-bold text-gray-800 font-poppins">{authorName || "Himalayan Team"}</h3>
      <p className="text-xs text-teal-600 font-semibold mb-3">Adventure Correspondent</p>
      <p className="text-sm text-gray-500 leading-relaxed">
        Passionate explorer sharing stories, guides, and tips straight from the peaks and valleys of the beautiful Himalayas.
      </p>
    </div>
  );
}
