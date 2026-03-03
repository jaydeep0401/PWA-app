"use client";
import { initDB } from "@/lib/db";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
type Blog = {
  id: number;
  title: string;
  content: string;
  autherName: string;
};

const ListingNotes = () => {
  const [listBlogs, setListBlogs] = useState<Blog[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  const router = useRouter();



  // fetch all blog post from DB
  useEffect(() => {
    async function fetchBlogs() {
      const db = await initDB();
      const blogs = await db.getAll("blogs");
      setListBlogs(blogs);
    }
    fetchBlogs();
  }, []);

  // Delet Blog
  const deleteBlog = (id: any) => {
    const filterdBlogs = listBlogs.filter((blogs) => blogs?.id !== id);

    setListBlogs(filterdBlogs);
    // Update localStorage
    localStorage.setItem("blogs", JSON.stringify(filterdBlogs));
  };

  // filter out blog
  const filterBlogs = listBlogs.filter(
    (blogs) =>
      blogs.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blogs.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blogs.autherName.toLowerCase().includes(searchQuery.toLowerCase()),
  );
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8"
    >
      {/* Header Section */}
      <div className="flex justify-between items-center mb-10">
        <motion.h1
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold text-gray-800"
        >
          📒 Saved Notes
        </motion.h1>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => router.push("/")}
          className="px-6 py-2 rounded-full bg-white shadow-md border border-gray-200 hover:shadow-lg transition"
        >
          Back
        </motion.button>
      </div>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 bg-white/70 backdrop-blur-md p-6 rounded-2xl shadow-md border border-gray-100">
        {/* Left Side - Create Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => router.push("/create-blog")}
          className="px-6 py-3 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-medium shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer"
        >
          + Create Blog
        </motion.button>

        {/* Right Side - Search */}
        <div className="relative w-full md:w-80">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search notes..."
            className="w-full pl-12 pr-4 py-3 rounded-full border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
          />

          {/* Search Icon */}
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
            🔍
          </span>
        </div>
      </div>

      {/* Empty State */}
      {filterBlogs.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center justify-center mt-20 text-gray-400"
        >
          <p className="text-xl">No notes found!!</p>
          <span className="text-sm mt-2">
            Start creating your first note ✨
          </span>
        </motion.div>
      ) : (
        <motion.ul
          layout
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.15,
              },
            },
          }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8"
        >
          <AnimatePresence>
            {filterBlogs.map((blog) => (
              <motion.li
                key={blog.id}
                layout
                whileHover={{ y: -5 }}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: 100 }}
                transition={{ type: "spring", stiffness: 120 }}
                className="bg-white/70 backdrop-blur-lg p-6 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                {/* Content */}
                <div className="space-y-3">
                  <h2 className="text-xl font-semibold text-gray-800">
                    {blog.title}
                  </h2>

                  <p className="text-gray-600 line-clamp-3">{blog.content}</p>

                  <span className="text-sm text-gray-400">
                    ✍️ {blog.autherName}
                  </span>
                </div>

                {/* Buttons */}
                <div className="flex gap-3 mt-6">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => deleteBlog(blog.id)}
                    className="flex-1 py-2 rounded-full border border-red-200 text-red-600 hover:bg-red-50 transition"
                  >
                    Delete
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => router.push(`/edit-blog/${blog.id}`)}
                    className="flex-1 py-2 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-md hover:shadow-lg transition"
                  >
                    Edit
                  </motion.button>
                </div>
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>
      )}
    </motion.div>
  );
};

export default ListingNotes;
