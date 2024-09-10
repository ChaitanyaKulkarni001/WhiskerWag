import React, { useState, useEffect } from 'react';
import api from '../api';
import { Navigate } from 'react-router-dom';

const Content = ({ method }) => {
  const [data, setData] = useState([]);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [url, setUrl] = useState('');
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

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
      setUrl('/api/petpal/blogs/');
    }
  };

  const getData = async () => {
    try {
      const res = await api.get(`${url}?page=${page}`);
      console.log('res  ', res);
      let newData;
      if (method === 'posts') {
        newData = res.data.results;
      } else {
        newData = res.data;
      }
      setData((prevData) => [...prevData, ...newData]);
      if (!res.data.next) {
        setHasMore(false);
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

  const handleClick = async (postId, hasLiked) => {
    try {
      // Toggle like status
      if (hasLiked) {
        await api.delete(`/api/posts/${postId}/like/`);
        // Update the like count and status in the state directly
        setData((prevData) =>
          prevData.map((item) =>
            item.id === postId
              ? { ...item, user_has_liked: false, like_count: item.like_count - 1 }
              : item
          )
        );
      } else {
        await api.post(`/api/posts/${postId}/like/`);
        // Update the like count and status in the state directly
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
        setData([]);
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

  const deleteItem = async (id) => {
    try {
      const res = await api.delete(`${url}delete/${id}`);
      if (res.status === 204) {
        alert('Item deleted successfully');
        setData([]);
        setPage(1);
        getData();
      } else {
        alert('Something went wrong!');
      }
    } catch (err) {
      console.error(err);
      alert('Something went wrong!');
    }
  };

  const loadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <main
      className={`absolute inset-0 flex justify-center items-start ${
        method !== 'posts' ? 'ml-[20%] mr-[25%]' : ''
      }`}
    >
      <div className="bg-gray-300 p-6 rounded-lg shadow-lg text-gray-900">
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mb-8 block mx-auto"
        >
          {showForm ? 'Cancel' : 'Share what your pets think!'}
        </button>

        {showForm && (
          <form onSubmit={handleSubmit} className="bg-gray-100 p-6 rounded-lg shadow-md mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">
              Create {method === 'posts' ? 'Post' : 'PetPal Entry'}
            </h2>
            {method === 'posts' ? (
              <>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
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
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="content">
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
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="img">
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
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="pet_name">
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
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
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
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="Quick_tip">
                    Quick Tip
                  </label>
                  <textarea
                    id="Quick_tip"
                    name="Quick_tip"
                    value={formData.Quick_tip || ''}
                    onChange={handleChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Quick Tip"
                    rows="2"
                  />
                </div>
              </>
            )}

            <button
              type="submit"
              className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={loading}
            >
              {loading ? 'Submitting...' : `Create ${method === 'posts' ? 'Post' : 'PetPal Entry'}`}
            </button>
          </form>
        )}

        <div>
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">
            {method === 'posts' ? 'Posts' : 'PetPal Entries'}
          </h2>
          <ul>
            {data.map((item) => (
              <li key={item.id} className="mb-6 p-6 rounded-lg shadow-lg">
                {method === 'posts' ? (
                  <>
                    <h3 className="text-xl font-semibold mb-2 text-gray-800">{item.title}</h3>
                    <p className="text-gray-700 mb-2">{item.content}</p>
                    {item.img && (
                      <img
                        src={item.img}
                        alt={item.title}
                        className="mt-2 w-full h-auto rounded"
                      />
                    )}
                  </>
                ) : (
                  <>
                    <h3 className="text-xl font-semibold mb-2 text-gray-800">{item.pet_name}</h3>
                    <p className="text-gray-700 mb-2">{item.description}</p>
                    {item.Quick_tip && (
                      <p className="text-gray-600 italic">Quick Tip: {item.Quick_tip}</p>
                    )}
                  </>
                )}

                <span
                  className={`material-symbols-outlined cursor-pointer ${item.user_has_liked ? 'text-red-500' : 'text-gray-500'}`}
                  onClick={() => handleClick(item.id, item.user_has_liked)}
                >
                  {item.user_has_liked ? '🩷' : '🤍'}
                </span>
                <span>{item.like_count}</span>
              </li>
            ))}
          </ul>
          {hasMore && (
            <button
              onClick={loadMore}
              className="mt-8 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline block mx-auto"
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
