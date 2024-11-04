import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import SummarizeArticle from './components/SummerizeArticle';
import AnalyzeSentiment from './components/AnalyzeSentiment';
import ExtractEntities from './components/ExtractEntities';
import ExtractKeywords from './components/ExtractKeywords';
import GetTopics from './components/GetTopics';
import GetSimilarArticles from './components/GetSimilarArticles';
import ClassifyArticle from './components/ClassifyArticle';
import TranslateArticle from './components/TranslateArticle';
import SearchArticles from './components/SearchArticles';
import Health from './components/Heath';

function App() {
  return (
    <Router>
      <Navbar />
      <div className="container mx-auto p-4">
        <Routes>
          <Route path="/search" element={<SearchArticles />} />
          <Route path="/summarize" element={<SummarizeArticle />} />
          <Route path="/sentiment" element={<AnalyzeSentiment />} />
          <Route path="/entities" element={<ExtractEntities />} />
          <Route path="/keywords" element={<ExtractKeywords />} />
          <Route path="/topics" element={<GetTopics />} />
          <Route path="/similar" element={<GetSimilarArticles />} />
          <Route path="/classify" element={<ClassifyArticle />} />
          <Route path="/translate" element={<TranslateArticle />} />
          <Route path="/" element={<Health/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
