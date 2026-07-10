import React from "react";

export default function BlogContent({ content }) {
  if (!content) return null;

  return (
    <article className="prose prose-teal max-w-none font-poppins text-gray-700 leading-relaxed space-y-6">
      {/* Fallback styling for elements inside raw HTML content */}
      <div 
        className="blog-html-content"
        dangerouslySetInnerHTML={{ __html: content }} 
      />
      
      {/* Styling injected explicitly to style standard tag outputs from DB */}
      <style>{`
        .blog-html-content h1 {
          font-size: 2.25rem;
          font-weight: 700;
          color: #1f2937;
          margin-top: 2rem;
          margin-bottom: 1rem;
          line-height: 1.2;
        }
        .blog-html-content h2 {
          font-size: 1.75rem;
          font-weight: 600;
          color: #1f2937;
          margin-top: 1.75rem;
          margin-bottom: 0.75rem;
          line-height: 1.3;
        }
        .blog-html-content h3 {
          font-size: 1.375rem;
          font-weight: 600;
          color: #374151;
          margin-top: 1.5rem;
          margin-bottom: 0.5rem;
        }
        .blog-html-content p {
          margin-top: 0;
          margin-bottom: 1.25rem;
          font-size: 1.05rem;
          line-height: 1.75;
          color: #4b5563;
        }
        .blog-html-content ul {
          list-style-type: disc;
          padding-left: 1.5rem;
          margin-bottom: 1.25rem;
          space-y: 0.5rem;
        }
        .blog-html-content ol {
          list-style-type: decimal;
          padding-left: 1.5rem;
          margin-bottom: 1.25rem;
          space-y: 0.5rem;
        }
        .blog-html-content li {
          margin-bottom: 0.5rem;
          font-size: 1.05rem;
          color: #4b5563;
        }
        .blog-html-content blockquote {
          border-left: 4px solid #0d9488;
          padding-left: 1.25rem;
          font-style: italic;
          color: #0f766e;
          background-color: #f0fdfa;
          padding-top: 0.75rem;
          padding-bottom: 0.75rem;
          margin: 1.5rem 0;
          border-radius: 0 0.5rem 0.5rem 0;
        }
        .blog-html-content img {
          max-width: 100%;
          height: auto;
          border-radius: 0.75rem;
          margin: 1.75rem 0;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
        }
        .blog-html-content pre {
          background-color: #f3f4f6;
          padding: 1rem;
          border-radius: 0.5rem;
          overflow-x: auto;
          margin: 1.5rem 0;
        }
      `}</style>
    </article>
  );
}
