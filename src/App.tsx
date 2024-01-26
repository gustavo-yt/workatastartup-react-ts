import './App.css';

import {
  DEFAULT_EMBEDDING_MODEL,
  DEFAULT_LONG_INPUT,
  DEFAULT_SHORT_INPUT,
} from './utils/constants';

import JobSearch from './components/JobSearch';
import { Pool } from 'pg';
// import { getHighlighter } from 'shikiji';
import { getQuery } from './utils/database';
import logo from './logo.svg';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });


async function searchJobs(
  embeddingModel: string,
  longInput: string,
  shortInput: string,
  country: string
): Promise<any[]> {
  'use server';
  const query = getQuery(embeddingModel, longInput, shortInput, country);
  const jobs = await pool.query(query.query, query.params);
  return (jobs.rows as any[]).map((job) =>
    _.mapKeys(job, (v, k) => _.camelCase(k))
  ) as any[];
}

async function getSqlString(
  embeddingModel: string,
  longInput: string,
  shortInput: string,
  country: string
) {
  'use server';
  return getQuery(embeddingModel, longInput, shortInput, country).query;
}

async function getHtml(code: string) {
  // const shiki = await getHighlighter({
  //   themes: ['github-light'],
  //   langs: [
  //     'bash',
  //     'sql',
  //     'python',
  //     'javascript',
  //     'typescript',
  //     'ruby',
  //     'java',
  //   ],
  // });
  // const html = shiki.codeToHtml(code, {
  //   lang: 'sql',
  //   theme: 'github-light',
  // });
  // return html;
  return ""
}




 async function App() {

  const jobs =  await searchJobs(
    DEFAULT_EMBEDDING_MODEL,
    DEFAULT_LONG_INPUT,
    DEFAULT_SHORT_INPUT,
    ''
  );
  const query =  await getSqlString(
    DEFAULT_EMBEDDING_MODEL,
    DEFAULT_LONG_INPUT,
    DEFAULT_SHORT_INPUT,
    ''
  );
  const html = await getHtml(query);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
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


