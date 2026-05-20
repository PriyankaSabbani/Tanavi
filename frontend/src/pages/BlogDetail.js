import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { blogs } from '../data/blogs';

const BlogDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const blog = blogs.find(b => b.id === parseInt(id));

  if (!blog) return <div className="pt-20 text-center">Blog not found</div>;

  return (
    <div className="pt-16 min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <button onClick={() => navigate(-1)} className="mb-6 text-primary hover:underline">
          ← Back to Blogs
        </button>
        
        <article className="bg-white rounded-lg shadow-lg overflow-hidden">
          <img src={blog.image} alt={blog.title} className="w-full h-96 object-cover" />
          <div className="p-8">
            <span className="text-sm text-primary font-semibold">{blog.category}</span>
            <h1 className="text-4xl font-bold mt-2 mb-4">{blog.title}</h1>
            <div className="flex items-center gap-4 text-gray-500 mb-8">
              <span>{blog.date}</span>
              <span>•</span>
              <span>{blog.readTime}</span>
            </div>
            <div className="prose max-w-none">
              {blog.content.map((paragraph, index) => (
                <p key={index} className="text-gray-700 mb-4 leading-relaxed">{paragraph}</p>
              ))}
            </div>
          </div>
        </article>
      </div>
    </div>
  );
};

export default BlogDetail;
