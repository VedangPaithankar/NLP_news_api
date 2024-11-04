import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link 
          className="text-xl font-bold"
          to='/'>
          NLP News API
        </Link>
        <div className="flex space-x-4">
          <Link
            to="/search"
            className="hover:bg-blue-500 px-3 py-2 rounded transition duration-200"
          >
            Search
          </Link>
          <Link
            to="/summarize"
            className="hover:bg-blue-500 px-3 py-2 rounded transition duration-200"
          >
            Summarize
          </Link>
          <Link
            to="/sentiment"
            className="hover:bg-blue-500 px-3 py-2 rounded transition duration-200"
          >
            Sentiment
          </Link>
          <Link
            to="/entities"
            className="hover:bg-blue-500 px-3 py-2 rounded transition duration-200"
          >
            Entities
          </Link>
          <Link
            to="/keywords"
            className="hover:bg-blue-500 px-3 py-2 rounded transition duration-200"
          >
            Keywords
          </Link>
          <Link
            to="/topics"
            className="hover:bg-blue-500 px-3 py-2 rounded transition duration-200"
          >
            Topics
          </Link>
          <Link
            to="/similar"
            className="hover:bg-blue-500 px-3 py-2 rounded transition duration-200"
          >
            Similar Articles
          </Link>
          <Link
            to="/classify"
            className="hover:bg-blue-500 px-3 py-2 rounded transition duration-200"
          >
            Classify
          </Link>
          <Link
            to="/translate"
            className="hover:bg-blue-500 px-3 py-2 rounded transition duration-200"
          >
            Translate
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;