import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import './guildDiscovery.css'

const GuildDiscovery = () => {
  const dispatch = useDispatch();

  // const results = useSelector(state => state.searchResults)

  const [isLoaded, setIsLoaded] = useState(true);
  const [showDefault, setShowDefault] = useState(true)
  const [showResults, setShowResults] = useState(false)

//   useEffect(() => {
//     dispatch(loadSearchResults(''))
//     .then(() => setIsLoaded(true));

//     return () => {
//         setIsLoaded(false)
//     }

// }, [dispatch])


const search = async (e) => {
  e.preventDefault();
  //Dispatch

  setShowDefault(false)
  setShowResults(true)
}


  return (
      <div className="mainSearchContent">
        {isLoaded && (
          <>
            {showDefault && (
              <>
                <div className="topSearchBG">
                  <div className="topSearchContent">
                    <h3>Find your community on Discuss</h3>
                    <h5>From gaming, to music, to learning, there's a place for you.</h5>
                      <form>
                        <div className="searchGuildForm">
                          <input
                          className="searchInput"
                          type="text"
                          placeholder="Explore communities"
                          />
                          <button className="searchCompassButton" onClick={search}>
                            <i class="fas fa-search"></i>
                          </button>
                        </div>
                      </form>
                  </div>
                  <img className="searchBGImage" src="https://res.cloudinary.com/dt8q1ngxj/image/upload/v1636571660/Discuss/guildDiscovery_joyfnj.png" alt ="Search BG"/>
                </div>
                <div className="featuredContainer">
                  <h4>
                    Featured communities
                  </h4>
                </div>
            </>
            )}
            {showResults && (
              <h1>Results Here!</h1>
            )}
          </>
        )}
      </div>
  );
}

export default GuildDiscovery;
