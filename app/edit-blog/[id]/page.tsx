"use client";
import { initDB } from "@/lib/db";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const EditBlogPost = () => {
  const [formData, setFormData] = useState({
    id: 0,
    title: "",
    content: "",
    autherName: "",
  });

  const params = useParams();
  const router = useRouter();

  // perticular blog id
  const id = Number(params?.id);

  // fetch all blog and prefill thos details
  useEffect(() => {
    async function fetchBlog() {
       if (!params?.id) return; 

      const db = await initDB();
      const blog = await db.get("blogs", id);
      if (blog) {
        setFormData(blog);
      }
    }

    fetchBlog();
  }, [id]);

  // handler edit function
  const handleEditBlog = async (e: React.FormEvent) => {
    e.preventDefault();

    const db = await initDB();

    await db.put("blogs", formData); // wait update

    router.push("/blog-list");
  };
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <form
        onSubmit={handleEditBlog}
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
          Edit Blog
        </button>
      </form>
    </div>
  );
};

export default EditBlogPost;
