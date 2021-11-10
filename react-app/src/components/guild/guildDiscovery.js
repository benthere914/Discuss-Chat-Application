import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { searchServer } from '../../store/search';
import ServerCard from './singleSearch';

import './guildDiscovery.css'

const GuildDiscovery = () => {
  const dispatch = useDispatch();

  const results = useSelector(state => Object.values(state.search));
  const user = useSelector(state => state.session.user);

  const [searchParameters, setSearchParamters] = useState('')
  const [isLoaded, setIsLoaded] = useState(false);
  const [showDefault, setShowDefault] = useState(true)
  const [showResults, setShowResults] = useState(false)

  useEffect(() => {
    dispatch(searchServer('$$default$$'))
    .then(() => setIsLoaded(true));

    return () => {
        setIsLoaded(false)
    }

}, [dispatch])

useEffect(() => {
  console.log(results)
}, [results])


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
                    Featured communities
                    {results?.map(server =>
                      <ServerCard user={user} server={server} />
                    )}
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
