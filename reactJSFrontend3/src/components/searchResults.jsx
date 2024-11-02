
import { useEffect, useState } from 'react';
import '../styles.css';
import SingleSearchResult from './singleSearchResult';

function SearchResults({authenticatedUsername, search, searchCategory}) {

    const [listOfSearchResults, setListOfSearchResults] = useState([]);
    const [allPastSearchesOfUser, setAllPastSearchesOfUser] = useState([]);
    const [pastSearchesOfUserInCurrentSearchCategory, setPastSearchesOfUserInCurrentSearchCategory] = useState([]);

    useEffect(() => {
        fetchPastSearchesOfUser();
    }, []);

    useEffect(() => {
        if(search.length==0) {
            setListOfSearchResults(pastSearchesOfUserInCurrentSearchCategory);
        }
        else {
            fetchSearchResults();
        }
    }, [search]);


    useEffect(() => {
        if(searchCategory.length==0) {
            setPastSearchesOfUserInCurrentSearchCategory(allPastSearchesOfUser);
        }
        else {
            setPastSearchesOfUserInCurrentSearchCategory(allPastSearchesOfUser.filter(x=>{
                if(x[1]===searchCategory) {
                    return true;
                }
                return false;
            }));
        }
    }, [searchCategory]);



    async function fetchPastSearchesOfUser() {
        const response = await fetch(`http://localhost:8025/getShopSearchesOfUser/${authenticatedUsername}`);
        if(!response.ok) {
            throw new Error('Network response not ok');
        }
        const fetchedPastSearches = await response.json();
        let newPastSearchesOfUser = [];
        for(let fetchedPastSearch of fetchedPastSearches) {
            newPastSearchesOfUser.push([fetchedPastSearch.search, fetchedPastSearch.searchCategory]);
        }
        if(search.length==0) {
            setAllPastSearchesOfUser(newPastSearchesOfUser);
            if(searchCategory.length>0) {
                newPastSearchesOfUser = newPastSearchesOfUser.filter(x=>{
                    if(x[1]===searchCategory) {
                        return true;
                    }
                    return false;
                });
            }
            setPastSearchesOfUserInCurrentSearchCategory(newPastSearchesOfUser);
            setListOfSearchResults(newPastSearchesOfUser);
        }
    }

    async function fetchSearchResults() {
        const response = await fetch(`http://localhost:8025/getShopSearchResults/${search}/${searchCategory.length>0 ? searchCategory : 'all'}`);
        if(!response.ok) {
            throw new Error('Network response not ok');
        }
        let searchResults = await response.json();

        const pastSearchesByAuthUserThatWorkHere = pastSearchesOfUserInCurrentSearchCategory.filter(x=>x[0].startsWith(search)
        && !searchResults.includes(x[0])).map(x=>x[0]);

        searchResults = [...pastSearchesByAuthUserThatWorkHere, ...searchResults];

        if(!searchResults.includes(search)) {
            searchResults.splice(0, 0, search);
        }
        searchResults = searchResults.map(searchResult=> [searchResult, searchCategory]);
        //console.log(searchResults);
        setListOfSearchResults(searchResults);
    }

    async function deleteSearchResult(indexToDelete) {
        const resultToDelete = listOfSearchResults[indexToDelete];
    
        const response = await fetch(`http://localhost:8025/deleteShopSearch/${authenticatedUsername}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                search: resultToDelete[0],
                searchCategory: resultToDelete[1]
            })
        });
    
        if (!response.ok) {
            throw new Error('Network response not ok');
        }
    
        setListOfSearchResults(prevResults =>
            prevResults.filter((_, index) => index !== indexToDelete)
        );
    }

    return (
    <>
        {listOfSearchResults.length>0 &&
            <div style={{backgroundColor: 'white', height: '33em', boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px', overflowY: 'scroll',
            display: 'flex', flexDirection: 'column'}}>
                {listOfSearchResults.map((result, index) => {
                    return (
                        <SingleSearchResult key={index} id={index} result={result[0]} category={result[1]}
                        notifyParentToDeleteSearchResult={deleteSearchResult} isDeletable={search.length==0}
                        showCategory={searchCategory.length==0}/>
                    );
                })
                }
            </div>
        }
    </>
    )
}

export default SearchResults
