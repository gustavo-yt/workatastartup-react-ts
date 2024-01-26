import './App.css';

import {
  DEFAULT_EMBEDDING_MODEL,
  DEFAULT_LONG_INPUT,
  DEFAULT_SHORT_INPUT,
} from './utils/constants';
import React, { useEffect, useState } from 'react';

import JobSearch from './components/JobSearch';
import { getHighlighter } from 'shikiji';
import { getQuery } from './utils/database';
import logo from './logo.svg';

// Assuming the searchJobs function and other async functions are defined elsewhere

function App() {
  const [jobs, setJobs] = useState<string[]>([]);
  const [query, setQuery] = useState<string>(''); // If query is a string
  const [html, setHtml] = useState<string>(''); // If html is a string


  useEffect(() => {
    const fetchJobs = async () => {
      const jobsData = await searchJobs();
      setJobs(jobsData);
    };

    const fetchQuery = async () => {
      const queryString = await getSqlString(
        DEFAULT_EMBEDDING_MODEL,
        DEFAULT_LONG_INPUT,
        DEFAULT_SHORT_INPUT,
        ''
      );
      setQuery(queryString);
    };

    const fetchHtml = async () => {
      const htmlData = await getHtml(query);
      setHtml(htmlData);
    };

    fetchJobs();
    fetchQuery();
    fetchHtml();
  }, []); // Empty dependency array ensures this runs once on mount

  return (
    <div className="App">
      <JobSearch
        defaultJobs={jobs}
        defaultQuery={query}
        defaultHtml={html}
        searchJobs={searchJobs}
        getHtml={getHtml}
        getQuery={getSqlString}
      />
    </div>
  );
}

export default App;

async function searchJobs(): Promise<any[]> {
  // Your searchJobs implementation
  return new Promise((resolve) => {
    resolve([]);
  })
}

async function getSqlString(embeddingModel:any, longInput:any, shortInput:any, country:any): Promise<string>{
  // Your getSqlString implementation
  return new Promise((resolve) => {
    resolve('');
  })
}

async function getHtml(code:any): Promise<string> {
  // Your getHtml implementation
  return new Promise((resolve) => {
    resolve('');
  })
}