import React from 'react';

const Explore = () => {
  return (
    <div className="bg-gray-900 text-gray-100 min-h-screen p-6">
      <div className="max-w-4xl mx-auto">
        <header className="mb-8">
          <h1 className="text-4xl font-bold mb-4">Explore</h1>
          <p className="text-lg">
            Discover the latest content, popular categories, and recent updates. Dive into a world of interesting posts and engaging discussions.
          </p>
        </header>

        <section className="mb-12">
          <h2 className="text-3xl font-semibold mb-6">Featured Content</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Example featured content cards */}
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-2">Featured Post Title</h3>
              <p className="text-gray-400 mb-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum.</p>
              <a href="#" className="text-blue-500 hover:underline">Read More</a>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-2">Another Featured Post</h3>
              <p className="text-gray-400 mb-4">Curabitur ac nisl vitae arcu iaculis consectetur non non tortor. Integer euismod nulla eget libero.</p>
              <a href="#" className="text-blue-500 hover:underline">Read More</a>
            </div>
            {/* Add more featured content as needed */}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-semibold mb-6">Categories</h2>
          <ul className="flex flex-wrap gap-4">
            <li className="bg-gray-800 p-4 rounded-lg shadow-lg flex-1 min-w-[200px]">
              <h3 className="text-xl font-semibold mb-2">Category 1</h3>
              <p className="text-gray-400">Explore posts related to this category.</p>
              <a href="#" className="text-blue-500 hover:underline">View Category</a>
            </li>
            <li className="bg-gray-800 p-4 rounded-lg shadow-lg flex-1 min-w-[200px]">
              <h3 className="text-xl font-semibold mb-2">Category 2</h3>
              <p className="text-gray-400">Discover content in this category.</p>
              <a href="#" className="text-blue-500 hover:underline">View Category</a>
            </li>
            {/* Add more categories as needed */}
          </ul>
        </section>

        <section>
          <h2 className="text-3xl font-semibold mb-6">Recent Updates</h2>
          <div className="space-y-6">
            {/* Example recent update items */}
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-2">Update Title</h3>
              <p className="text-gray-400">Details about the recent update. Stay informed with the latest changes and improvements.</p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-2">Another Update</h3>
              <p className="text-gray-400">More information on recent activities and changes. Be up-to-date with what's happening.</p>
            </div>
            {/* Add more updates as needed */}
          </div>
        </section>
      </div>
      <button 
          onClick={() => window.history.back()} 
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
        >
          Go Back
        </button>
    </div>
  );
};

export default Explore;
