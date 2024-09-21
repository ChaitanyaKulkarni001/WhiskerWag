import React, { useContext } from 'react';
import { ThemeContext } from '../ThemeContext';
import Lottie from 'lottie-react';

import petAnimation from '../Animation - 1726242978026.json';
import petAnimation2 from '../Animation - 1726243550885.json';

const Explore = () => {
  const { theme } = useContext(ThemeContext);
  const bgClass = theme === 'dim' 
    ? 'bg-gray-800'  // Dark theme background
    : 'bg-gradient-to-r from-pink-500 to-orange-400';

  return (
    <div className={`bg-gray-900 text-gray-100 min-h-screen ${bgClass} px-4`}>
      {/* Header Section */}
      <button 
        onClick={() => window.history.back()} 
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 mt-2 px-4 rounded mb-6"
      >
        Go Back
      </button> 
      <header className="flex flex-col md:flex-row items-center justify-between mb-8">
        <Lottie 
          animationData={petAnimation} 
          loop={true} 
          className="w-full ml-3 md:w-[900px] h-[600px] md:h-[300px] mb-6 md:mb-0"
        />
        <div className="text-center ml-5 md:text-left">
          <h1 className="text-3xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-800 to-black">
            Explore WHISKERWAG!
          </h1>
          <p className="text-lg md:text-xl mt-4 w-[70%] text-gray-300" style={{ textAlign: 'justify' }}>
  Discover a world filled with heartwarming stories, essential pet care tips, and the latest updates for passionate pet lovers. 
  At WhiskerWag, we believe pets are more than companions—they’re family. Whether you're a dog lover or a proud cat parent, 
  our community is here to inspire, support, and celebrate the special bond you share with your furry friends. Dive in, 
  connect, and let’s make every wag and purr count.
</p>

        </div>
      </header>

      {/* Go Back button */}
      

      {/* Content Sections */}
      <div className="max-w-7xl mx-auto">
        {/* Featured Stories Section */}
        <section className="mb-12">
          <h2 className="text-2xl md:text-3xl font-semibold mb-6">Featured Stories</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-2">The Joy of Family Dogs</h3>
              <p className="text-gray-400 mb-4">Explore how family dogs bring joy and unconditional love to homes, and tips to bond with them better.</p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-2">Pet Care Essentials</h3>
              <p className="text-gray-400 mb-4">From grooming to nutrition, find essential tips to ensure your pets live happy and healthy lives.</p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-2">Training Your Dog</h3>
              <p className="text-gray-400 mb-4">Learn effective techniques to train your dog and strengthen your relationship through positive reinforcement.</p>
            </div>
          </div>
        </section>

        {/* Categories Section */}
        <section className="mb-12">
          <h2 className="text-2xl md:text-3xl font-semibold mb-6">Categories</h2>
          <ul className="flex flex-wrap gap-4">
            <li className="bg-gray-800 p-4 rounded-lg shadow-lg flex-1 min-w-[200px]">
              <h3 className="text-xl font-semibold mb-2">Dogs</h3>
              <p className="text-gray-400">Explore posts related to dogs, from training to care tips.</p>
            </li>
            <li className="bg-gray-800 p-4 rounded-lg shadow-lg flex-1 min-w-[200px]">
              <h3 className="text-xl font-semibold mb-2">Cats</h3>
              <p className="text-gray-400">Discover stories and tips about caring for your feline friends.</p>
            </li>
            <li className="bg-gray-800 p-4 rounded-lg shadow-lg flex-1 min-w-[200px]">
              <h3 className="text-xl font-semibold mb-2">Health & Wellness</h3>
              <p className="text-gray-400">Learn about the latest trends in pet health, wellness, and nutrition.</p>
            </li>
            <li className="bg-gray-800 p-4 rounded-lg shadow-lg flex-1 min-w-[200px]">
              <h3 className="text-xl font-semibold mb-2">Training Tips</h3>
              <p className="text-gray-400">Master the best training practices for your pets.</p>
            </li>
          </ul>
        </section>

        {/* Recent Updates Section */}
        <section>
          <h2 className="text-2xl md:text-3xl font-semibold mb-6">Recent Updates</h2>
          <div className="space-y-6">
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-2">New Blog Series: Family Dogs</h3>
              <p className="text-gray-400">We’ve just launched a series of blogs dedicated to exploring the special bond between families and their dogs.</p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-2">Platform Updates</h3>
              <p className="text-gray-400">Exciting new features added to WhiskerWag! Enjoy a smoother experience and discover enhanced functionalities for our community.</p>
            </div>
          </div>
        </section>
      </div>

      {/* Bottom-right animation */}
      <Lottie 
        animationData={petAnimation2} 
        loop={true} 
        className="w-[200px] md:w-[300px] h-[150px] md:h-[200px] fixed bottom-0 right-0" 
      />
    </div>
  );
};

export default Explore;
