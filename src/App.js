import logo from './logo.svg';
import './App.css';
import FilterJobTitles from './components/FilterJobTitles';
import JobListContainer from './components/JobListContainer';
import JobDetails from './components/JobDetails';
import { getAllJobs } from './services/job.services';
import { useEffect, useState } from 'react';
import { extractCategoriesFromJobs } from './utils/jobs.utils';

function App() {

  const [jobs, setJobs] = useState([]);

  const fetchJobs = async () => {
    // getAllJobs().then(jobs => setJobs(jobs))
    const jobs = await getAllJobs();
    setJobs(jobs);
    console.log(extractCategoriesFromJobs(jobs).filter( (item,index,value) => value.indexOf(item) ===index ));
  }

  // const findDuplicates = (arr) => {
  //   return arr.filter((item, index) => arr.indexOf(item) !== index);
  // };
  
  // const sentence = ['apple', 'apple', 'banana', 'cat', 'cat', 'dog'];
  // const duplicates = findDuplicates(sentence);
  
  // console.log('Duplicate items:', duplicates);

  useEffect(() => {
    fetchJobs();
  }, [])

  console.log(jobs);

  return (
    <div className="App h-screen flex flex-col">
      <FilterJobTitles />
      <div className="flex flex-1 h-full border-l overflow-hidden">
        <JobListContainer jobs={jobs} />
        <JobDetails jobs={jobs} />
      </div>
    </div>
  );
}

export default App;
