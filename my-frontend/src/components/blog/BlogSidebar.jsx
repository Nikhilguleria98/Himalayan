import React from "react";
import AuthorCard from "./AuthorCard";
import ShareButtons from "./ShareButtons";
import RecentBlogs from "./RecentBlogs";
import NewsletterCard from "./NewsletterCard";

export default function BlogSidebar({ blog }) {
  return (
    <aside className="w-full lg:w-[350px] flex-shrink-0 flex flex-col gap-8 lg:sticky lg:top-24 h-fit">
      {/* Author Card */}
      <AuthorCard authorName={blog.author} />

      {/* Share Buttons */}
      <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
        <ShareButtons title={blog.title} />
      </div>

      {/* Popular Stories */}
      <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
        <RecentBlogs />
      </div>

      {/* Newsletter */}
      <NewsletterCard />
    </aside>
  );
}
