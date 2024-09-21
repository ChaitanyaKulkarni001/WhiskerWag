import React, { useState, useEffect, useContext } from 'react';
import api from '../api';
import { Navigate } from 'react-router-dom';
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import advancedFormat from "dayjs/plugin/advancedFormat"; // for more formatting options
import { FaHeart } from "react-icons/fa"; // Like icon
import { ThemeContext } from '../ThemeContext';

// Extend dayjs with relativeTime and advancedFormat
dayjs.extend(relativeTime);
dayjs.extend(advancedFormat);

const Content = ({ method, setShowForm, showForm }) => {
  const [data, setData] = useState([]);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [url, setUrl] = useState('');
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const { theme } = useContext(ThemeContext);

  function Logout() {
    localStorage.clear();
    return <Navigate to="/login" />;
  }

  useEffect(() => {
    handleURLS();
  }, [method]);

  useEffect(() => {
    if (url) {
      getData();
    }
  }, [url, page]);

  const handleURLS = () => {
    if (method === 'posts') {
      setUrl('/api/posts/');
    } else {
      setUrl('/api/petpal/blogs/'); // Ensure the correct API endpoint
    }
  };

  const getData = async () => {
    try {
      const res = await api.get(`${url}?page=${page}`);
      console.log("res.data ", res.data);
      let newData = res.data.results || res.data; // Ensure it handles both responses correctly
      setData((prevData) => [...prevData, ...newData]);
      if (!res.data.next) {
        setHasMore(false);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const formatCreatedAt = (createdAt) => {
    const now = dayjs();
    const postDate = dayjs(createdAt);
    if (now.isSame(postDate, 'day')) {
      return "Today";
    }
    return postDate.fromNow(); // Shows "X days ago", "X hours ago", etc.
  };

  const handleClick = async (postId, hasLiked) => {
    try {
      if (hasLiked) {
        await api.delete(`/api/posts/${postId}/like/`);
        setData((prevData) =>
          prevData.map((item) =>
            item.id === postId
              ? { ...item, user_has_liked: false, like_count: item.like_count - 1 }
              : item
          )
        );
      } else {
        await api.post(`/api/posts/${postId}/like/`);
        setData((prevData) =>
          prevData.map((item) =>
            item.id === postId
              ? { ...item, user_has_liked: true, like_count: item.like_count + 1 }
              : item
          )
        );
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formDataToSend = new FormData();

    if (method === 'posts') {
      formDataToSend.append('title', formData.title);
      formDataToSend.append('content', formData.content);
      if (formData.img) {
        formDataToSend.append('img', formData.img);
      }
    } else {
      formDataToSend.append('pet_name', formData.pet_name);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('Quick_tip', formData.Quick_tip);
    }

    try {
      const res = await api.post(url, formDataToSend, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      if (res.status === 201) {
        alert('Item created successfully!');
        setFormData({});
        setData([]); // Reset data to refresh the list
        setPage(1);
        getData();
        setShowForm(false);
      } else {
        alert('Failed to create item');
      }
    } catch (err) {
      console.error(err);
      alert('Failed to create item');
    } finally {
      setLoading(false);
    }
  };

  const loadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <main
      className={`flex  p-6 ${
        theme === 'dim'
          ? 'bg-gray-800'
          : 'bg-gradient-to-r from-orange-400 to-yellow-400'
      } w-full lg:w-[60%] lg:ml-[20%]`}
    >
      <div
        className={`p-6 shadow-lg text-gray-900 ${
          theme === 'dim'
            ? 'bg-gray-800'
            : 'bg-gradient-to-r from-orange-400 to-yellow-400'
        }`}
      >
        <h2
          className={`text-2xl font-semibold mb-4 ${
            theme === 'dim' ? 'text-white' : 'text-gray-800'
          }`}
        >
          {method === 'posts' ? 'Posts' : 'PetPal Entries'}
        </h2>
        <button
          onClick={() => {
            setShowForm(!showForm);
          }}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mb-8 block mx-auto"
        >
          {showForm ? 'Cancel' : 'Share what your pets think!'}
        </button>

        {showForm && (
          <form
            onSubmit={handleSubmit}
            className={`${
              theme === 'dim'
                ? 'bg-black'
                : 'bg-gradient-to-r from-yellow-400 to-orange-400'
            } p-6 rounded-lg shadow-md mb-8`}
          >
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">
              Create {method === 'posts' ? 'Post' : 'PetPal Entry'}
            </h2>
            {method === 'posts' ? (
              <>
                <div className="mb-4">
                  <label
                    className={`block text-gray-700 text-sm font-bold mb-2`}
                    htmlFor="title"
                  >
                    Title
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title || ''}
                    onChange={handleChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Post title"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="content"
                  >
                    Content
                  </label>
                  <textarea
                    id="content"
                    name="content"
                    value={formData.content || ''}
                    onChange={handleChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Post content"
                    rows="4"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="img"
                  >
                    Image
                  </label>
                  <input
                    type="file"
                    id="img"
                    name="img"
                    onChange={handleChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                </div>
              </>
            ) : (
              <>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="pet_name"
                  >
                    Pet Name
                  </label>
                  <input
                    type="text"
                    id="pet_name"
                    name="pet_name"
                    value={formData.pet_name || ''}
                    onChange={handleChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Pet name"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="description"
                  >
                    Description
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description || ''}
                    onChange={handleChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Description"
                    rows="4"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="Quick_tip"
                  >
                    Quick Tip
                  </label>
                  <input
                    type="text"
                    id="Quick_tip"
                    name="Quick_tip"
                    value={formData.Quick_tip || ''}
                    onChange={handleChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Quick tip for pet care"
                    required
                  />
                </div>
              </>
            )}
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              disabled={loading}
            >
              {loading ? 'Submitting...' : 'Submit'}
            </button>
          </form>
        )}

        <div
          className={`overflow-y-auto h-[600px] hide-scrollbar ${
            theme === 'dim' ? 'bg-gray-800 text-white' : 'bg-transparent'
          }`}
        >
          {data.map((item) => (
            <div
              key={item.id}
              className={`mb-4 p-4 border rounded shadow-md ${
                theme === 'dim' ? 'bg-gray-900' : 'bg-transparent'
              }`}
            >
              <h3
                className={`text-lg font-bold mb-2 ${
                  theme === 'dim' ? 'text-yellow-400' : 'text-gray-800'
                }`}
              >
                {item.title || item.pet_name}
              </h3>
              <p
                className={`mb-2 ${
                  theme === 'dim' ? 'text-gray-300' : 'text-gray-700'
                }`}
              >
                {item.content || item.description}
              </p>
              {item.img && (
                <img
                  src={item.img}
                  alt={item.title || item.pet_name}
                  className="w-full h-auto rounded mb-2"
                />
              )}
              <p
                className={`text-gray-500 text-sm ${
                  theme === 'dim' ? 'text-gray-400' : 'text-gray-500'
                }`}
              >
                {formatCreatedAt(item.created_at)}
              </p>
              {method === 'posts' && (
                <div className="flex items-center justify-between">
                  <button
                    onClick={() => handleClick(item.id, item.user_has_liked)}
                    className={`flex items-center ${
                      item.user_has_liked ? 'text-red-500' : 'text-gray-700'
                    }`}
                  >
                    <FaHeart className="mr-1" />
                    {item.like_count} Likes
                  </button>
                </div>
              )}
            </div>
          ))}
          {hasMore && (
            <button
              onClick={loadMore}
              className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Load More
            </button>
          )}
        </div>
      </div>
    </main>
  );
};

export default Content;
