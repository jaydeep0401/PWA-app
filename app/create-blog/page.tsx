"use client";

import { initDB } from "@/lib/db";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

const CreateNotes = () => {
  // Form State
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    autherName: "",
  });

  // Router
  const router = useRouter();

  //save blog handler function
  const saveBlogPost = async (e: React.FormEvent) => {
    const newBlogs = {
      id: Date.now(),
      ...formData,
    };

    const db = await initDB();
    return db.add("blogs", newBlogs);
  };
  return (
    <div className="min-h-screen  flex items-center justify-center p-4">

      {/* form form creating blog post */}
      <form
        onSubmit={saveBlogPost}
        className="w-full max-w-lg bg-white rounded-2xl shadow-lg p-8 flex flex-col gap-6"
      >
        {/* Header */}
        <div>
          <h1 className="text-2xl font-semibold text-gray-800">
            Create Blog Post
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Write and save your thoughts offline
          </p>
        </div>

        {/* Title */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">Title</label>
          <input
            type="text"
            placeholder="Enter blog title"
            className="px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={formData.title}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, title: e.target.value }))
            }
            required
          />
        </div>

        {/* Content */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">Content</label>
          <textarea
            placeholder="Write your content here..."
            rows={5}
            className="px-4 py-2 rounded-lg border resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={formData.content}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, content: e.target.value }))
            }
            required
          />
        </div>

        {/* Author */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">Author</label>
          <input
            type="text"
            placeholder="Your name"
            className="px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={formData.autherName}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, autherName: e.target.value }))
            }
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="mt-4 bg-blue-500 hover:bg-blue-600 transition text-white font-medium py-2 rounded-lg cursor-pointer"
        >
          Save Blog
        </button>
        {/* Shoe all blog post */}
        <button
          type="button"
          onClick={() => router.push("/blog-list/")}
          className="  bg-gray-600 hover:bg-gray-800 transition text-white font-medium py-2 rounded-lg cursor-pointer"
        >
          Show Blogs
        </button>
      </form>
    </div>
  );
};

export default CreateNotes;
