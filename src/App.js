import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from './Component/Dashboard';
import ContactSearch from './Component/ContactSearch';
import { SearchProvider } from './Component/SearchContext';
import Nav from './Component/Nav'


const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  return (
    <>

      
        <Nav />
        <SearchProvider>
          <Routes>
            <Route exact path='/' element={<Dashboard searchTerm={searchTerm} />} />
            <Route path='/contactsearch' element={<ContactSearch onSearchTermChange={setSearchTerm} />} />
          </Routes>
        </SearchProvider>
      

    </>
  )
}

export default App