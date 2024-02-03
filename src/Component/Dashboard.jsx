import React from 'react'
import { CgArrowTopRight } from "react-icons/cg";
import { useSearch } from './SearchContext';




const Dashboard = ({ searchTerm }) => {
  // const { searchTerm } = useSearch();
  const { searchTerms } = useSearch();
  console.log(searchTerm)
  
  return (
    <>
      <div className="container">
        <div className="dashboard-con">
          <h2>Search Accross 200M+ contacts</h2>

          <div className="saved_search_box">
            <span className='search-text'>Saved Searches</span>

            <ul>
              {searchTerms.filter(term => term.trim() !== '').slice().reverse().map((term, index) => (
                <li key={index}>
                  <span>{term}</span>
                  <span className='top-arrow'><CgArrowTopRight /></span>
                </li>
              ))}
            </ul>

          </div>
        </div>
      </div>

    </>
  )
}

export default Dashboard