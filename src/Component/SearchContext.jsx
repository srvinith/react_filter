import React, { createContext, useContext, useState, useEffect } from 'react';

const SearchContext = createContext();

export const useSearch = () => useContext(SearchContext);

export const SearchProvider = ({ children }) => {
    const [searchTerms, setSearchTerms] = useState([]);

    useEffect(() => {
        // Fetch the saved search terms from local storage on initial load
        const savedSearchTerms = JSON.parse(localStorage.getItem('searchTerms')) || [];
        setSearchTerms(savedSearchTerms);
    }, []);

    const saveSearchTerm = (term) => {
        const updatedSearchTerms = [...searchTerms, term];
        localStorage.setItem('searchTerms', JSON.stringify(updatedSearchTerms));
        setSearchTerms(updatedSearchTerms);
    };

    return (
        <SearchContext.Provider value={{ searchTerms, saveSearchTerm }}>
            {children}
        </SearchContext.Provider>
    );
};
