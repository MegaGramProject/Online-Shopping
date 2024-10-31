
import '../styles.css';
import { useState, useEffect } from 'react';
import SingleSearchResult from './singleSearchResult'

function SearchResults({authenticatedUsername, search}) {

    const [listOfSearchResults, setListOfSearchResults] = useState([]);
    const allResults = [['0', 'sneakers', 'Clothing & Shoes'], ['1', 'harry potter', 'Books'], ['2', 'mascara', '']];

    useEffect(() => {
        let newListOfSearchResults = [];
        if(search.length==0) {
            newListOfSearchResults = allResults.map((result, index)=> <SingleSearchResult key={index} id={result[0]} result={result[1]} category={result[2]} />);
        }
        else {
            for(let result of allResults) {
                if(result[1].startsWith(search)) {
                    newListOfSearchResults.push(<SingleSearchResult key={newListOfSearchResults.length} id={result[0]} result={result[1]} category={result[2]} />)
                }
            }
        }
        setListOfSearchResults(newListOfSearchResults);
    }, [search]);

    return (
    <>
        <div style={{backgroundColor: 'white', height: '15em', boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px', overflowY: 'scroll',
        display: 'flex', flexDirection: 'column'}}>
            {listOfSearchResults}
        </div>
    </>
    )
}

export default SearchResults
