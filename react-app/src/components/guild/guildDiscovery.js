import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { searchServer } from '../../store/search';

import './guildDiscovery.css'

const GuildDiscovery = () => {
  const dispatch = useDispatch();

  const results = useSelector(state => state.search)

  //replace any percent with %25
  // any space with %20

  const [searchParameters, setSearchParamters] = useState('')
  const [isLoaded, setIsLoaded] = useState(true);
  const [showDefault, setShowDefault] = useState(true)
  const [showResults, setShowResults] = useState(false)

  useEffect(() => {
    dispatch(searchServer('1'))
    .then(() => setIsLoaded(true));

    return () => {
        setIsLoaded(false)
    }

}, [dispatch])


const search = async (e) => {
  e.preventDefault();
  if (searchParameters.length === 0) {
    return;
  }

  //Clean the search parameters
  const finalParameters = searchParameters.split('%').join("%25").split(" ").join("%20")
  console.log(finalParameters)


  //Dispatch
  await dispatch(searchServer(finalParameters))

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
                          value={searchParameters}
                          onChange={(e) => setSearchParamters(e.target.value)}

                          />
                          <button className="searchCompassButton" onClick={search}>
                            <i className="fas fa-search"></i>
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
